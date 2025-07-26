import { Prisma, Type } from "@/generated/prisma/index.js";

export interface TypesRepository {
    create(data: Prisma.TypeCreateInput): Promise<Type>
    findByName(name: string): Promise<Type | null>
}