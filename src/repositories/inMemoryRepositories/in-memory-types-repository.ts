import { Prisma, Type } from "@/generated/prisma/index.js";
import { TypesRepository } from "../types-repository.js";

export class InMemoryTypesRepository

    implements TypesRepository {
    public items: Map<number, Type> = new Map()
    private nexId = 1;

    async findByName(name: string): Promise<Type | null> {
        const allTypes = Array.from(this.items.values())

        const type = allTypes.find(item => item.name === name)

        if (!type) {
            return null
        }

        return type
    }
    async create({ name }: Prisma.TypeCreateInput) {
        const newType = {
            id: this.nexId,
            name
        }
        this.items.set(newType.id, newType)
        this.nexId++

        return newType
    }
}