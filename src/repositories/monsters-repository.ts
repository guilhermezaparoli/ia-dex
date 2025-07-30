import { Monster, Prisma } from "prisma/generated/prisma/index.js"


export interface FindManyParams {
    page: number
    pageSize: number
    typeId?: number
}
export interface MonsterRepository {
    create(data: Prisma.MonsterUncheckedCreateInput): Promise<Monster>
    findByName(name: string): Promise<Monster | null>
    findMany({
        page,
        pageSize,
        typeId
    }: FindManyParams): Promise<Monster[]>
}