import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMonsterUseCase } from "./create-monster.js";
import { InMemoryMonsterRepository } from "@/repositories/inMemoryRepositories/in-memory-monster-repository.js";
import { Monster } from "@/generated/prisma/index.js";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { MonsterNameAlreadyExistsError } from "./error/monster-name-already-exists-error-copy.js";


let monsterRepository: MonsterRepository
let sut: CreateMonsterUseCase

describe("Create Monster Use Case", () => {
    beforeEach(() => {
        monsterRepository = new InMemoryMonsterRepository()
        sut = new CreateMonsterUseCase(monsterRepository)
    })

    it('should be able to create a new monster', async () => {
        const monsterData = {
            name: faker.animal.insect(),
            history: faker.lorem.text(),
            image: faker.image.url(),
            created_at: new Date(),
            type_id: 12,
            user_id: randomUUID()
        }

        const { monster } = await sut.execute(monsterData)


        expect(monster).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: monsterData.name,
            history: monsterData.history,
            image: monsterData.image,
            type_id: monsterData.type_id,
            user_id: monsterData.user_id,
        }))
    })

    it('should not be able to create a monster with same name', async () => {
        const duplicateName = 'Gargoyle'
        const monsterData = {
            name: duplicateName,
            history: faker.lorem.text(),
            image: faker.image.url(),
            created_at: new Date(),
            type_id: 12,
            user_id: randomUUID()
        }

        await sut.execute(monsterData)


        expect(() => sut.execute({
            ...monsterData,
            history: "A different story",
            user_id: randomUUID()
        })).rejects.instanceOf(MonsterNameAlreadyExistsError)
    })

})