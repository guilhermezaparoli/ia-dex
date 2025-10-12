import { UsersRepository } from "@/repositories/users-repository.js";
import { InvalidCredentialsError } from "./error/invalid-credentials-error.js";
import * as argon2 from "argon2"
import { User } from "@prisma/client";


interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) { }


    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {


        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const passwordIsValid = await argon2.verify(user.password_hash, password)

        if (!passwordIsValid) {
            throw new InvalidCredentialsError()
        }


        return {
            user
        }


    }
}