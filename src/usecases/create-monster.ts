
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import cloudinary from "@/services/cloudinary/cloudinary.js";
import { Monster, Types } from "prisma/generated/prisma/index.js";
import { ImageGenerationFailedError } from "./error/ImageGenerationFailedError.js";
import { MonsterNameAlreadyExistsError } from "./error/monster-name-already-exists-error-copy.js";
import { UploadCloudinaryError } from "./error/upload-cloudinary-error.js";
import { ImageGeneratorService } from "@/services/openIA/image-generator-service.js";
import { StoryAndStatsGeneratorService } from "@/services/openIA/story-and-stats-generator.js";


interface CreateMonsterUseCaseRequest {
    name: string
    description: string
    story: string
    user_id: string
    types: Types[]
}

interface CreateMonsterUseCaseResponse {
    monster: Monster
}

export class CreateMonsterUseCase {

    constructor(
        private monstersRepository: MonsterRepository,
        private imageGeneratorService: ImageGeneratorService,
        private storyAndStatusGeneratorService: StoryAndStatsGeneratorService
    ) { }


    async execute({ story, name, types, user_id, description }: CreateMonsterUseCaseRequest): Promise<CreateMonsterUseCaseResponse> {


        const monsterAlreadyExists = await this.monstersRepository.findByName(name)


        if (monsterAlreadyExists) {
            throw new MonsterNameAlreadyExistsError()
        }

        const imagePrompt = `
        A detailed digital painting of a monster named ${name}.
        ${description}.
        High-quality fantasy creature concept art.
        Do not include text, letters, numbers, or watermarks in the image.
        Focus only on the creature and its environment.
        `;
        const storyPrompt = `Write a short origin story in portuguese for a monster named ${name}, types: ${types?.toString()}, described as: "${description} and ${story}".`;

      
        const [imageUrl, storyAndStats] = await Promise.all([
        this.imageGeneratorService.generateImage(imagePrompt),
        this.storyAndStatusGeneratorService.generateStoryAndStats(storyPrompt)
        ]);


        const image = await fetch(imageUrl)
        const buffer = Buffer.from(await image.arrayBuffer())


        let publicUrl = '';


        try {
            const dataUri = `data:image/png;base64,${buffer.toString('base64')}`

            const result = await cloudinary.uploader.upload(dataUri, {
                folder: "monsters"
            })

            publicUrl = result.secure_url
        } catch (error) {
            throw new UploadCloudinaryError()
        }


       const {stats: generatedStats, story: generatedStory} = storyAndStats 



        const monster = await this.monstersRepository.create({
            story: generatedStory,
            description,
            image: publicUrl,
            name,
            hp: generatedStats?.hp,
            attack: generatedStats?.attack,
            defense: generatedStats?.defense,
            speed: generatedStats?.speed,
            special_attack: generatedStats?.special_attack,
            special_defense: generatedStats?.special_defense,
            types,
            user_id
        })


        return {
            monster
        }
    }
}