import { InMemoryMonsterRepository } from "@/repositories/inMemoryRepositories/in-memory-monster-repository.js";
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchMonsterUseCase } from "./fetch-monsters.js";
import { FetchMonsterByIdUseCase } from "./fetch-monster-by-id.js";
import { ResourceNotFoundError } from "./error/resource-not-found-error.js";

let monstersRepository: MonsterRepository
let sut: FetchMonsterByIdUseCase
describe("Fetch Monster By ID Use Case", () => {

    beforeEach(() => {
        monstersRepository = new InMemoryMonsterRepository()
        sut = new FetchMonsterByIdUseCase(monstersRepository)
    })


    it('should be able to get a monster by ID', async () => {

       
        const { id } =  await  monstersRepository.create({
                name: `teste`,
                description: "teste",
                image: 'url',
                story: 'teste',
                type_id: 1,
                user_id: randomUUID()
            })

        

        const { monster } = await sut.execute(id)

        expect(monster).toEqual((expect.objectContaining({
            name: 'teste'
        })))
    })
    it('should not be able to get a monster by ID', async () => {

        await expect( () => sut.execute(999087098989)).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})