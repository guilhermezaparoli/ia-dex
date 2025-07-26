import { Type } from "@/generated/prisma/index.js";
import { TypesRepository } from "@/repositories/types-repository.js";
import { TypeNameAlreadyExistsError } from "./error/type-name-already-exists-error.js";

interface CreateTypeRequest {
    name: string
}
interface CreateTypeResponse {
    type: Type
}

export class CreateType {
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