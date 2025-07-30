import { PrismaTypesRepository } from "@/repositories/prisma/prisma-types-repository.js";
import { FetchTypesUseCase } from "../fetch-types.js";

export function makeFetchTypesUseCase() {

    const typesRepository = new PrismaTypesRepository()
    const makeFetchTypesUseCase = new FetchTypesUseCase(typesRepository)

    return makeFetchTypesUseCase
}