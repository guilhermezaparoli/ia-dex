import { InMemoryTypesRepository } from "@/repositories/inMemoryRepositories/in-memory-types-repository.js";
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchMonsterUseCase } from "./fetch-monsters.js";
import { InMemoryMonsterRepository } from "@/repositories/inMemoryRepositories/in-memory-monster-repository.js";
import { randomUUID } from "node:crypto";

let monstersRepository: MonsterRepository
let sut: FetchMonsterUseCase
describe("Fetch Monster Use Case", () => {

    beforeEach(() => {
        monstersRepository = new InMemoryMonsterRepository()
        sut = new FetchMonsterUseCase(monstersRepository)
    })


    it('should be able to get all monsters paginated', async () => {

        for(let i = 1; i <= 12; i++){
            monstersRepository.create({
                name: `teste-${i}`,
                description: "teste",
                image: 'url',
                story: 'teste',
                type_id: 1,
                user_id: randomUUID()
            })

        }



        const { monsters } = await sut.execute({
            page: 2,
            pageSize: 10,
        })

        expect(monsters).toHaveLength(2)
        expect(monsters).toEqual(([
            expect.objectContaining({
                name: "teste-11"
            }),
            expect.objectContaining({
                name: "teste-12"
            }),
        ]))
    })

})