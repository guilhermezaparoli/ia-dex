import { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "./error/resource-not-found-error.js";
import { InvalidCredentialsError } from "./error/invalid-credentials-error.js";
import * as argon2 from "argon2";
import { User } from "@prisma/client";

interface ChangePasswordUseCaseRequest {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

interface ChangePasswordUseCaseResponse {
    user: Omit<User, "password_hash">;
}

export class ChangePasswordUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        userId,
        currentPassword,
        newPassword,
    }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        const isCurrentPasswordValid = await argon2.verify(
            user.password_hash,
            currentPassword
        );

        if (!isCurrentPasswordValid) {
            throw new InvalidCredentialsError();
        }

        const newPasswordHash = await argon2.hash(newPassword);

        const updatedUser = await this.usersRepository.updatePassword(
            userId,
            newPasswordHash
        );

        return {
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                created_at: updatedUser.created_at,
            },
        };
    }
}
