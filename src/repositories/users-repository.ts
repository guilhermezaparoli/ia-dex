import { Prisma, User } from "@/generated/prisma/index.js"


export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
}