import { UsersRepository } from "@/repositories/users-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.js";
import { faker } from "@faker-js/faker"
import { InMemoryUsersRepository } from "@/repositories/inMemoryRepositories/in-memory-users-repository.js";
import { UserEmailAlreadyExistsError } from "./error/user-email-already-exists-error.js";
import * as argon2 from "argon2"



let usersRepository: UsersRepository
let sut: RegisterUseCase
describe("Register Use Case", async () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })
    it("should be able to register", async () => {

        const email = faker.internet.email()
        const name = faker.person.firstName()
        const password = faker.internet.password()

        const { user } = await sut.execute({
            email,
            name,
            password
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should not be able to register with existent email", async () => {

        const email = faker.internet.email()
        const name = faker.person.firstName()
        const password = faker.internet.password()

        await sut.execute({
            email,
            name,
            password
        })


        await expect(() => sut.execute({
            email,
            name,
            password
        })).rejects.instanceOf(UserEmailAlreadyExistsError)
    })

    it("should create a password hash at register", async () => {
        const email = faker.internet.email()
        const name = faker.person.firstName()
        const password = faker.internet.password()

       const {user} = await sut.execute({
            email,
            name,
            password
        })

        const passwordIsValidHash = await argon2.verify(user.password_hash, password)

        expect(passwordIsValidHash).toBe(true)
    })
})