import { Prisma, Type } from "prisma/generated/prisma/index.js"

export interface TypesRepository {
    create(data: Prisma.TypeCreateInput): Promise<Type>
    findByName(name: string): Promise<Type | null>
    findMany():Promise< Type[]>
}