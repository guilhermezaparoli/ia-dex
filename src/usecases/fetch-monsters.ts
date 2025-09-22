import { FindManyResult, MonsterRepository } from "@/repositories/monsters-repository.js";
import { Types } from "prisma/generated/prisma/index.js";

interface FetchMonsterUseCaseRequest {
    page: number
    pageSize: number
    types?: Types[]
}

export class FetchMonsterUseCase {
    constructor(private monsterRepository: MonsterRepository) { }


    async execute({ page, pageSize, types }: FetchMonsterUseCaseRequest): Promise<FindManyResult> {
        
        const monsters = await this.monsterRepository.findMany({
            page,
            pageSize,
            types
        })

        return monsters;
            
        
    }
}