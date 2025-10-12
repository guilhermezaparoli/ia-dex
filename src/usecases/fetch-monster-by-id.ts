import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { Monster } from "@prisma/client";
import { ResourceNotFoundError } from "./error/resource-not-found-error.js";

interface FetchMonsterResponse {
    monster: Monster
}

export class FetchMonsterByIdUseCase {

    constructor(private monstersRepository: MonsterRepository) { }

    async execute(monsterId: number): Promise<FetchMonsterResponse> {

        const monster = await this.monstersRepository.findById(monsterId)

        if (!monster) {
            throw new ResourceNotFoundError()
        }

        return {
            monster
        }
    }
}