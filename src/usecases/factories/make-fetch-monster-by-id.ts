import { PrismaMonsterRepository } from "@/repositories/prisma/prisma-monster-repository.js";
import { FetchMonsterUseCase } from "../fetch-monsters.js";
import { FetchMonsterByIdUseCase } from "../fetch-monster-by-id.js";

export function makeFetchMonsterByIdUseCase() {

    const monstersRepository = new PrismaMonsterRepository()
    const fetchMonsterUseCase = new FetchMonsterByIdUseCase(monstersRepository)

    return fetchMonsterUseCase
}