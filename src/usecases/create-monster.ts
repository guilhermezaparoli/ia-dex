
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import cloudinary from "@/services/cloudinary/cloudinary.js";
import { Monster } from "prisma/generated/prisma/index.js";
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
    type_id: number
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


    async execute({ story, name, type_id, user_id, description }: CreateMonsterUseCaseRequest): Promise<CreateMonsterUseCaseResponse> {


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
        const storyPrompt = `Write a short origin story in portuguese for a monster named ${name}, described as: "${description}".`;

        let imageUrl: string;
        try {
            imageUrl = await this.imageGeneratorService.generateImage(imagePrompt);
        } catch (error) {

            console.error("Image Generation Service Error:", error);
            throw new ImageGenerationFailedError();
        }

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


        let generatedStory = '';
        let generetedStats = null;
        try {

            const result = await this.storyAndStatusGeneratorService.generateStoryAndStats(storyPrompt)

            generatedStory = result.story
            generetedStats = result.stats
        } catch (error) {

        }


        const monster = await this.monstersRepository.create({
            story: generatedStory,
            description,
            image: publicUrl,
            name,
            hp: generetedStats?.hp,
            attack: generetedStats?.attack,
            defense: generetedStats?.defense,
            speed: generetedStats?.speed,
            special_attack: generetedStats?.special_attack,
            special_defense: generetedStats?.special_defense,
            type_id,
            user_id
        })

        return {
            monster
        }
    }
}