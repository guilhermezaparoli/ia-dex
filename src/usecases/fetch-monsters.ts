import { FindManyResult, MonsterRepository } from "@/repositories/monsters-repository.js";

interface FetchMonsterUseCaseRequest {
    page: number
    pageSize: number
    typeId?: number
}

export class FetchMonsterUseCase {
    constructor(private monsterRepository: MonsterRepository) { }


    async execute({ page, pageSize, typeId }: FetchMonsterUseCaseRequest): Promise<FindManyResult> {
        const monsters = await this.monsterRepository.findMany({
            page,
            pageSize,
            typeId
        })

console.log(monsters);
        return monsters;
            
        
    }
}