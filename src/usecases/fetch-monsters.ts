import { FindManyResult, MonsterRepository } from "@/repositories/monsters-repository.js";
import { Types } from "@prisma/client";

interface FetchMonsterUseCaseRequest {
    page: number
    pageSize: number
    types?: Types[]
    search?: string
}

export class FetchMonsterUseCase {
    constructor(private monsterRepository: MonsterRepository) { }


    async execute({ page, pageSize, types, search }: FetchMonsterUseCaseRequest): Promise<FindManyResult> {
        
        const monsters = await this.monsterRepository.findMany({
            page,
            pageSize,
            types,
            search
        })

        return monsters;
            
        
    }
}