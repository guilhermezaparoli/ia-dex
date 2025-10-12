
import { UsersRepository } from "@/repositories/users-repository.js"
import { UserEmailAlreadyExistsError } from "./error/user-email-already-exists-error.js"

import * as argon2 from "argon2"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    email: string
    password: string
    name: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {

    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ email, password, name }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

        if(emailAlreadyInUse){
            throw new UserEmailAlreadyExistsError()
        }

        const password_hash = await argon2.hash(password)

        const user = await this.usersRepository.create({
            email,
            name,
            password_hash
        })

        return {
            user
        }

    }
}