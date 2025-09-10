

import { Monster, Prisma } from "prisma/generated/prisma/index.js";
import { FindManyParams, FindManyResult, MonsterRepository } from "../monsters-repository.js";
import { prisma } from "@/lib/prisma/index.js";


export class PrismaMonsterRepository implements MonsterRepository {

    async create(data: Prisma.MonsterUncheckedCreateInput): Promise<Monster> {

        const monster = await prisma.monster.create({
            data
        })

        return monster
    }

    async findByName(name: string): Promise<Monster | null> {

        const monster = await prisma.monster.findUnique({
            where: {
                name
            }
        })

        return monster
    }

    async findMany({ page, pageSize, typeId }: FindManyParams): Promise<FindManyResult> {

        const monsters = await prisma.monster.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                type_id: typeId ? typeId : undefined
            },
        })

        const totalItems = await prisma.monster.count({
            where: {
                type_id: typeId ? typeId : undefined
            }
        })


        return {
            monsters,
            pagination: {
                totalItems,
                page,
                pageSize,
            }
        };
    }

    async findById(id: number): Promise<Monster | null> {
        
        const monster = await prisma.monster.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                },
            }
        })
        
        return monster
    }


}