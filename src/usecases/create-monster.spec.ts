import { InMemoryMonsterRepository } from "@/repositories/inMemoryRepositories/in-memory-monster-repository.js";
import { MonsterRepository } from "@/repositories/monsters-repository.js";

import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMonsterUseCase } from "./create-monster.js";
import { MonsterNameAlreadyExistsError } from "./error/monster-name-already-exists-error-copy.js";
import { ImageGeneratorService } from "@/services/openIA/image-generator-service.js";
import { InMeMoryImageGenerator } from "@/services/openIA/in-memory-image-generator.js";


let monsterRepository: MonsterRepository
let imageGeneratorService: ImageGeneratorService
let sut: CreateMonsterUseCase

describe("Create Monster Use Case", () => {
    beforeEach(() => {
        monsterRepository = new InMemoryMonsterRepository()
        imageGeneratorService = new InMeMoryImageGenerator()
        sut = new CreateMonsterUseCase(monsterRepository, imageGeneratorService)
    })

    it('should be able to create a new monster', async () => {
        const monsterData = {
            name: faker.animal.insect(),
            story: faker.lorem.text(),
            image: 'url',
            description: faker.lorem.text(),
            created_at: new Date(),
            type_id: 12,
            user_id: randomUUID()
        }

        const { monster } = await sut.execute(monsterData)


        expect(monster).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: monsterData.name,
            story: monsterData.story,
            image: monsterData.image,
            type_id: monsterData.type_id,
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
            type_id: 12,
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