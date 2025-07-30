
import { TypesRepository } from "../types-repository.js";
import { Prisma, Type } from "prisma/generated/prisma/index.js";


export class InMemoryTypesRepository implements TypesRepository {

    public items: Map<number, any> = new Map()
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

    async findMany() {
        const allTypes = Array.from(this.items.values())

        return allTypes
    }
}