
import { UsersRepository } from "../users-repository.js";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundError } from "@/usecases/error/resource-not-found.js";
import { Prisma, User } from "@/generated/prisma/index.js";

export class InMemoryUsersRepository implements UsersRepository {
    private users: User[] = []

    async create({ email, name, password_hash }: Prisma.UserCreateInput): Promise<User> {

        const user = {
            id: randomUUID(),
            email,
            name,
            password_hash,
            created_at: new Date()
        }

        this.users.push(user)


        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email)

        if (!user) {
            return null
        }

        return user
    }
}