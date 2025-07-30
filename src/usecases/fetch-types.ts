import { TypesRepository } from "@/repositories/types-repository.js";

export class FetchTypesUseCase {
    constructor(private typesRepository: TypesRepository) {}


    async execute() {
        const types = await this.typesRepository.findMany()


        return {
            types
        }
    }
}