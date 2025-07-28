import { PrismaMonsterRepository } from "@/repositories/prisma/prisma-monster-repository.js";
import { CreateMonsterUseCase } from "../create-monster.js";
import { OpenAIImageGeneratorService } from "@/services/open-ia-image-generator-service.js";
import { env } from "@/env/index.js";

export function makeCreateMonsterUseCase() {

    const monsterRepository = new PrismaMonsterRepository()
    const imageGenerator = new OpenAIImageGeneratorService(env.OPENAI_API_KEY)
    const creteMonsterUseCase = new CreateMonsterUseCase(monsterRepository, imageGenerator)

    return creteMonsterUseCase
}