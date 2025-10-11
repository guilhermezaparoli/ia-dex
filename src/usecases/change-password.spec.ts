import { beforeEach, describe, expect, it } from "vitest";
import { ChangePasswordUseCase } from "./change-password.js";
import { UsersRepository } from "@/repositories/users-repository.js";
import { InMemoryUsersRepository } from "@/repositories/inMemoryRepositories/in-memory-users-repository.js";
import { ResourceNotFoundError } from "./error/resource-not-found-error.js";
import { InvalidCredentialsError } from "./error/invalid-credentials-error.js";
import { faker } from "@faker-js/faker";
import * as argon2 from "argon2";

let usersRepository: UsersRepository;
let sut: ChangePasswordUseCase;

describe("Change Password Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new ChangePasswordUseCase(usersRepository);
    });

    it("should be able to change password with valid current password", async () => {
        const currentPassword = faker.internet.password();
        const newPassword = faker.internet.password();

        const user = await usersRepository.create({
            email: faker.internet.email(),
            name: faker.person.firstName(),
            password_hash: await argon2.hash(currentPassword),
        });

        const { user: updatedUser } = await sut.execute({
            userId: user.id,
            currentPassword,
            newPassword,
        });

        expect(updatedUser.id).toEqual(user.id);

        const userAfterUpdate = await usersRepository.findById(user.id);
        const isNewPasswordValid = await argon2.verify(
            userAfterUpdate!.password_hash,
            newPassword
        );
        expect(isNewPasswordValid).toBe(true);
    });

    it("should not be able to change password with invalid current password", async () => {
        const currentPassword = faker.internet.password();
        const wrongPassword = faker.internet.password();
        const newPassword = faker.internet.password();

        const user = await usersRepository.create({
            email: faker.internet.email(),
            name: faker.person.firstName(),
            password_hash: await argon2.hash(currentPassword),
        });

        await expect(() =>
            sut.execute({
                userId: user.id,
                currentPassword: wrongPassword,
                newPassword,
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to change password for non-existent user", async () => {
        const currentPassword = faker.internet.password();
        const newPassword = faker.internet.password();

        await expect(() =>
            sut.execute({
                userId: "non-existent-id",
                currentPassword,
                newPassword,
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it("should hash the new password correctly", async () => {
        const currentPassword = faker.internet.password();
        const newPassword = faker.internet.password();

        const user = await usersRepository.create({
            email: faker.internet.email(),
            name: faker.person.firstName(),
            password_hash: await argon2.hash(currentPassword),
        });

        await sut.execute({
            userId: user.id,
            currentPassword,
            newPassword,
        });

        const updatedUser = await usersRepository.findById(user.id);
        expect(updatedUser!.password_hash).not.toEqual(newPassword);
        expect(updatedUser!.password_hash).not.toEqual(currentPassword);
    });
});
