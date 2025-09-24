import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserUseCase } from "./fetch-user.js";
import { UsersRepository } from "@/repositories/users-repository.js";
import { InMemoryUsersRepository } from "@/repositories/inMemoryRepositories/in-memory-users-repository.js";
import { ResourceNotFoundError } from "./error/resource-not-found-error.js";

let usersRepository: UsersRepository
let sut: FetchUserUseCase
describe("Fetch User Use Case", async () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new FetchUserUseCase(usersRepository)
    })

    it('should be able to find an user by ID', async () => {
        
        const { id } = await usersRepository.create({
            email: 'teste@gmail.com',
            name: "Teste123",
            password_hash: "12345678"
        })

        const { user } = await sut.exec(id)

        expect(user?.id).toEqual(id)
    })
    it('should not be able to find an user by a fake ID', async () => {
        
        await usersRepository.create({
            email: 'teste@gmail.com',
            name: "Teste123",
            password_hash: "12345678"
        })

        await expect(() => sut.exec('12312312')).rejects.instanceOf(ResourceNotFoundError)
    })
})