
import { TypesRepository } from "@/repositories/types-repository.js";
import { TypeNameAlreadyExistsError } from "./error/type-name-already-exists-error.js";
import { Type } from "prisma/generated/prisma/index.js";

interface CreateTypeRequest {
    name: string
}
interface CreateTypeResponse {
    type: Type
}

export class CreateTypeUseCase {
    constructor(private typesRepository: TypesRepository) { }

    async execute({ name }: CreateTypeRequest): Promise<CreateTypeResponse> {

        const typeNameAlreadyExists = await this.typesRepository.findByName(name)

        if(typeNameAlreadyExists){
            throw new TypeNameAlreadyExistsError()
        }

        const type = await this.typesRepository.create({
            name
        })

        return {
            type
        }
    }

}