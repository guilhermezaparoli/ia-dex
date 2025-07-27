import { Monster } from "@/generated/prisma/index.js";
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { MonsterNameAlreadyExistsError } from "./error/monster-name-already-exists-error-copy.js";

interface CreateMonsterUseCaseRequest {
    name: string
    history: string
    image: string
    user_id: string
    type_id: number
}

interface CreateMonsterUseCaseResponse {
    monster: Monster
 }

export class CreateMonsterUseCase {

    constructor(private monstersRepository: MonsterRepository) { }


    async execute({ history, image, name, type_id, user_id }: CreateMonsterUseCaseRequest): Promise<CreateMonsterUseCaseResponse> {


        const monsterAlreadyExists = await this.monstersRepository.findByName(name)


        if(monsterAlreadyExists){
            throw new MonsterNameAlreadyExistsError()
        }

        const monster = await this.monstersRepository.create({
            history,
            image,
            name,
            type_id,
            user_id
        })


        return {
            monster
        }
    }
}