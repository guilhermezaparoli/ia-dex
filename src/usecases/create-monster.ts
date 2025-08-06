
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { MonsterNameAlreadyExistsError } from "./error/monster-name-already-exists-error-copy.js";
import { ImageGeneratorService } from "@/services/image-generator-service.js";
import { Monster } from "prisma/generated/prisma/index.js";
import { ImageGenerationFailedError } from "./error/ImageGenerationFailedError.js";


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
        private imageGeneratorService: ImageGeneratorService
    ) { }


    async execute({ story, name, type_id, user_id, description }: CreateMonsterUseCaseRequest): Promise<CreateMonsterUseCaseResponse> {


        const monsterAlreadyExists = await this.monstersRepository.findByName(name)


        if (monsterAlreadyExists) {
            throw new MonsterNameAlreadyExistsError()
        }

        const imagePrompt = `A monster named ${name}. ${description}. Digital art.`;
        const storyPrompt = `Write a short origin story in portuguese for a monster named ${name}, described as: "${description}".`;

        let imageUrl: string;
        try {
            imageUrl = await this.imageGeneratorService.generateImage(imagePrompt);
        } catch (error) {

            console.error("Image Generation Service Error:", error);
            throw new ImageGenerationFailedError();
        }

        console.log(imageUrl);
        
        const monster = await this.monstersRepository.create({
            story,
            description,
            image: imageUrl,
            name,
            type_id,
            user_id
        })


        return {
            monster
        }
    }
}