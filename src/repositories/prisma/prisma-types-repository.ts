import { prisma } from "@/lib/prisma/index.js";
import { TypesRepository } from "../types-repository.js";
import { Prisma, Type } from "prisma/generated/prisma/index.js";


export class PrismaTypesRepository implements TypesRepository {
    async findByName(name: string): Promise<Type | null> {
        const type = await prisma.type.findUnique({
            where: {
                name
            }
        })

        return type
    }

    async create(data: Prisma.TypeCreateInput): Promise<Type> {

        const type = await prisma.type.create({
            data
        })

        return type

    }

    async findMany(): Promise<Type[]> {
        const types = await prisma.type.findMany()

        return types
    }
}