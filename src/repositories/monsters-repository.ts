import { Monster, Prisma } from "@/generated/prisma/index.js";

export interface MonsterRepository {
    create(data: Prisma.MonsterCreateInput): Promise<Monster>
}