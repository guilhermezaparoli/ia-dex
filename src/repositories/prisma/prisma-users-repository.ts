import { prisma } from "@/lib/prisma/index.js";
import { UsersRepository } from "../users-repository.js";
import { Prisma, User } from "prisma/generated/prisma/index.js";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })

        return user
    }

    async findByEmail(email: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async updatePassword(userId: string, newPasswordHash: string): Promise<User> {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password_hash: newPasswordHash
            }
        })

        return user
    }
}