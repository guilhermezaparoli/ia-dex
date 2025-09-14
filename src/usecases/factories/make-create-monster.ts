import { PrismaMonsterRepository } from "@/repositories/prisma/prisma-monster-repository.js";
import { CreateMonsterUseCase } from "../create-monster.js";

import { env } from "@/env/index.js";
import { OpenAIImageGeneratorService } from "@/services/openIA/open-ia-image-generator-service.js";
import { OpenAIStoryAndStatsGeneratorService } from "@/services/openIA/open-ia-story-and-stats-generator-service.js";

export function makeCreateMonsterUseCase() {

    const monsterRepository = new PrismaMonsterRepository()
    const imageGenerator = new OpenAIImageGeneratorService(env.OPENAI_API_KEY)
    const storyAndStatusGenerator = new OpenAIStoryAndStatsGeneratorService(env.OPENAI_API_KEY)
    const creteMonsterUseCase = new CreateMonsterUseCase(monsterRepository, imageGenerator, storyAndStatusGenerator)

    return creteMonsterUseCase
}