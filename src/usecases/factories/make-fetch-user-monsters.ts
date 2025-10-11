import { PrismaMonsterRepository } from "@/repositories/prisma/prisma-monster-repository.js";
import { FetchUserMonstersUseCase } from "../fetch-user-monsters.js";

export function makeFetchUserMonsters() {
    const monsterRepository = new PrismaMonsterRepository();
    const fetchUserMonstersUseCase = new FetchUserMonstersUseCase(monsterRepository);

    return {
        fetchUserMonstersUseCase,
    };
}
