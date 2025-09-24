import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { FetchUserUseCase } from "../fetch-user.js";

export function makeFetchUser() {

    const usersRepository = new PrismaUsersRepository()
    const fetchUserUseCase = new FetchUserUseCase(usersRepository)

    return {
        fetchUserUseCase
    }
}