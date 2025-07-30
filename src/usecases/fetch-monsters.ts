import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { Monster } from "prisma/generated/prisma/index.js";

interface FetchMonsterUseCaseRequest {
    page: number
    pageSize: number
    typeId?: number
}
interface FetchMonsterUseCaseResponse {
    monsters: Monster[]
 }

export class FetchMonsterUseCase {
    constructor(private monsterRepository: MonsterRepository) { }


    async execute({ page, pageSize, typeId }: FetchMonsterUseCaseRequest): Promise<FetchMonsterUseCaseResponse> {
        const monsters = await this.monsterRepository.findMany({
            page,
            pageSize,
            typeId
        })


        return {
            monsters
        }
    }
}