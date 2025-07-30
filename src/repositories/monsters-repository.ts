import { Monster, Prisma } from "prisma/generated/prisma/index.js"

export interface MonsterRepository {
    create(data: Prisma.MonsterUncheckedCreateInput): Promise<Monster>
    findByName(name: string): Promise<Monster | null>
}