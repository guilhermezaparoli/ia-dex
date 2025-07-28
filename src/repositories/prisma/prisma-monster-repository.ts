

import { Monster, Prisma } from "prisma/generated/prisma/index.js";
import { MonsterRepository } from "../monsters-repository.js";
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


}