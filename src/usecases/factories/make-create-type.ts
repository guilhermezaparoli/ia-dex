import { PrismaTypesRepository } from "@/repositories/prisma/prisma-types-repository.js";
import { CreateTypeUseCase } from "../create-type.js";

export function makeCreateType() {
    const typesRepository = new PrismaTypesRepository()
    const createTypeUseCase = new CreateTypeUseCase(typesRepository)
    
    return createTypeUseCase
}