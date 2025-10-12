import { InMemoryMonsterRepository } from "@/repositories/inMemoryRepositories/in-memory-monster-repository.js";
import { MonsterRepository } from "@/repositories/monsters-repository.js";

import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateMonsterUseCase } from "./create-monster.js";
import { MonsterNameAlreadyExistsError } from "./error/monster-name-already-exists-error-copy.js";
import { ImageGeneratorService } from "@/services/openIA/image-generator-service.js";
import { InMeMoryImageGenerator } from "@/services/openIA/in-memory-image-generator.js";
import { StoryAndStatsGeneratorService } from "@/services/openIA/story-and-stats-generator.js";
import { InMeMoryStoryAndStatsGenerator } from "@/services/openIA/in-memory-story-and-stats-generator.js";
import { Types } from "@prisma/client";

vi.mock('@/services/cloudinary/cloudinary.js', () => ({
    default: {
        uploader: {
            upload: vi.fn().mockResolvedValue({
                secure_url: 'https://example.com/mocked-image.png'
            })
        }
    }
}));


let monsterRepository: MonsterRepository
let imageGeneratorService: ImageGeneratorService
let storyAndStatusGeneratorService: StoryAndStatsGeneratorService
let sut: CreateMonsterUseCase

describe("Create Monster Use Case", () => {
    beforeEach(() => {
        monsterRepository = new InMemoryMonsterRepository()
        imageGeneratorService = new InMeMoryImageGenerator()
        storyAndStatusGeneratorService = new InMeMoryStoryAndStatsGenerator()
        sut = new CreateMonsterUseCase(monsterRepository, imageGeneratorService, storyAndStatusGeneratorService)
    })

    it('should be able to create a new monster', async () => {
        const monsterData = {
            name: faker.animal.insect(),
            story: faker.lorem.text(),
            description: faker.lorem.text(),
            types: [Types.GRASS],
            user_id: randomUUID()
        }

        const { monster } = await sut.execute(monsterData)


        expect(monster).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: monsterData.name,
            story: expect.any(String),
            image: expect.any(String),
            user_id: monsterData.user_id,
        }))
    })

    it('should not be able to create a monster with same name', async () => {
        const duplicateName = 'Gargoyle'
        const monsterData = {
            name: duplicateName,
            story: faker.lorem.text(),
            description: faker.lorem.paragraph(),
            image: 'url',
            created_at: new Date(),
            types: [],
            user_id: randomUUID()
        }

        await sut.execute(monsterData)


       await expect(() => sut.execute({
            ...monsterData,
            story: "A different story",
            user_id: randomUUID()
        })).rejects.instanceOf(MonsterNameAlreadyExistsError)
    })

})