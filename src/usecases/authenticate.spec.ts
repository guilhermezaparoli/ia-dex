import { UsersRepository } from "@/repositories/users-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate.js";
import { InMemoryUsersRepository } from "@/repositories/inMemoryRepositories/in-memory-users-repository.js";
import { faker } from "@faker-js/faker";
import * as argon2 from "argon2"
import { InvalidCredentialsError } from "./error/invalid-credentials-error.js";


let usersRepository: UsersRepository
let sut: AuthenticateUseCase
describe("Authenticate Use Case", async () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })


    it("should be able to authenticate", async () => {

        const password = faker.internet.password()
        const name = faker.person.firstName()
        const email = faker.internet.email()

        await usersRepository.create({
            name,
            email,
            password_hash: await argon2.hash(password)
        })

        const { user } = await sut.execute({
            email,
            password
        })

        expect(user.id).toEqual(expect.any(String))

    })
    it("should not be able to authenticate with wrong e-mail", async () => {

        const password = faker.internet.password()
        const name = faker.person.firstName()
        const email = faker.internet.email()

        await usersRepository.create({
            name,
            email,
            password_hash: await argon2.hash(password)
        })

        

        await expect(() => sut.execute({
            email: "teste123@gmail.com",
            password
        })).rejects.instanceOf(InvalidCredentialsError)

    })
    it("should not be able to authenticate with wrong password", async () => {

        const password = faker.internet.password()
        const name = faker.person.firstName()
        const email = faker.internet.email()

        await usersRepository.create({
            name,
            email,
            password_hash: await argon2.hash(password)
        })

        

        await expect(() => sut.execute({
            email,
            password: "123456"
        })).rejects.instanceOf(InvalidCredentialsError)

    })
})