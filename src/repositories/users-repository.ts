import { Prisma, User } from "@prisma/client"



export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findByName(name: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    updatePassword(userId: string, newPasswordHash: string): Promise<User>
}