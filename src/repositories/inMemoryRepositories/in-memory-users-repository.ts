
import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository.js";
import { Prisma, User } from "@prisma/client";

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

    async findById(id: string): Promise<User | null> {
        const user = this.users.find((user) => user.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async updatePassword(userId: string, newPasswordHash: string): Promise<User> {
        const userIndex = this.users.findIndex((user) => user.id === userId)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        this.users[userIndex].password_hash = newPasswordHash

        return this.users[userIndex]
    }
}