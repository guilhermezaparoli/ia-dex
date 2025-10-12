import { FindManyResult, MonsterRepository } from "@/repositories/monsters-repository.js";
import { Types } from "@prisma/client";

interface FetchUserMonstersUseCaseRequest {
    userId: string;
    page: number;
    pageSize: number;
    types?: Types[];
    search?: string;
}

export class FetchUserMonstersUseCase {
    constructor(private monsterRepository: MonsterRepository) {}

    async execute({
        userId,
        page,
        pageSize,
        types,
        search,
    }: FetchUserMonstersUseCaseRequest): Promise<FindManyResult> {
        const monsters = await this.monsterRepository.findByUserId(userId, {
            page,
            pageSize,
            types,
            search,
        });

        return monsters;
    }
}
