import { Monster, Prisma, Types } from "prisma/generated/prisma/index.js"


export interface FindManyParams {
    page: number
    pageSize: number
    types?: Types[]
}


interface Pagination {
    page: number;
    pageSize: number;
    totalItems: number;
}

interface User {
    name: string;
    id: string;
    created_at: Date;
    email:string;
    password_hash: string;

}

export interface FindManyResult {
    monsters: Monster[];
    pagination: Pagination
}

export interface MonsterRepository {
    create(data: Prisma.MonsterUncheckedCreateInput): Promise<Monster>
    findByName(name: string): Promise<Monster | null>
    findMany({
        page,
        pageSize,
        types
    }: FindManyParams): Promise<FindManyResult>
    findById(id: number): Promise<Monster | null>
}