import { UsersRepository } from "@/repositories/users-repository.js";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./error/resource-not-found-error.js";

interface FetchUserUseCaseResponse {
    user: Omit<User, "password_hash">
}

export class FetchUserUseCase {

    constructor(private usersRepository: UsersRepository) { }


    async exec(userId: string) {

        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }


        return {
            user
        }
    }
}