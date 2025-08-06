import { PrismaMonsterRepository } from "@/repositories/prisma/prisma-monster-repository.js";
import { FetchMonsterUseCase } from "../fetch-monsters.js";

export function makeFetchMonstersUseCase() {

    const monstersRepository = new PrismaMonsterRepository()
    const fetchMonsterUseCase = new FetchMonsterUseCase(monstersRepository)

    return fetchMonsterUseCase
}