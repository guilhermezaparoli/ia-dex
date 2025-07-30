import { PrismaTypesRepository } from "@/repositories/prisma/prisma-types-repository.js";
import { CreateTypeUseCase } from "../create-type.js";

export function makeCreateTypeUseCase() {
    const typesRepository = new PrismaTypesRepository()
    const createTypeUseCase = new CreateTypeUseCase(typesRepository)
    
    return createTypeUseCase
}