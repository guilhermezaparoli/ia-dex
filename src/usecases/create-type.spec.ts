import { TypesRepository } from "@/repositories/types-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTypeUseCase } from "./create-type.js";
import { InMemoryTypesRepository } from "@/repositories/inMemoryRepositories/in-memory-types-repository.js";
import { TypeNameAlreadyExistsError } from "./error/type-name-already-exists-error.js";


let typesRepository: TypesRepository
let sut: CreateTypeUseCase
describe("Create type use case", () => {
    beforeEach(() => {
        typesRepository = new InMemoryTypesRepository()
        sut = new CreateTypeUseCase(typesRepository)
    })

    it('should create a new type', async () => { 
        
        const { type } = await sut.execute({
            name: 'Water'
        })

        expect(type.id).toEqual(expect.any(Number))
    })

    it('should not create a new type that already exists', async () => { 
        
        await sut.execute({
            name: 'Water'
        })

        await expect(() => sut.execute({
            name: 'Water'
        })).rejects.instanceOf(TypeNameAlreadyExistsError)
    })
})