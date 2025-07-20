
import { UsersRepository } from "@/repositories/users-repository.js"
import { UserEmailAlreadyExistsError } from "./error/user-email-already-exists-error.js"
import { User } from "@/generated/prisma/index.js"

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

        const user = await this.usersRepository.create({
            email,
            name,
            password_hash: password
        })

        return {
            user
        }

    }
}