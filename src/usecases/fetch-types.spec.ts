import { beforeEach, describe, expect, it } from "vitest";
import { FetchTypesUseCase } from "./fetch-types.js";
import { TypesRepository } from "@/repositories/types-repository.js";
import { InMemoryTypesRepository } from "@/repositories/inMemoryRepositories/in-memory-types-repository.js";
import { faker } from "@faker-js/faker";

let typesRepository: TypesRepository
let sut: FetchTypesUseCase
describe("Fetch Types Use Case", () => {

    beforeEach(() => {
        typesRepository = new InMemoryTypesRepository()
        sut = new FetchTypesUseCase(typesRepository)
    })


    it('should be able to get all types', async () => {

        for (let i = 1; i <= 2; i++) {
            typesRepository.create({
                name: faker.word.words(1)
            })
        }
        const { types } = await sut.execute()


        expect(types).toHaveLength(2)

        expect(types).toEqual(([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
            }),
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
            })
        ]))
    })

})