import { Monster, Prisma } from "@/generated/prisma/index.js";
import { MonsterRepository } from "../monsters-repository.js";

export class InMemoryMonsterRepository

    implements MonsterRepository {
    public items: Monster[] = []
    private nexId = 1;

    async create({ history, image, name, type_id, user_id, id }: Prisma.MonsterUncheckedCreateInput) {

        const monster: Monster = {
            id: id ?? this.nexId,
            name,
            history,
            image,
            type_id,
            user_id,
            created_at: new Date()
        }

        this.items.push(monster)


        return monster
    }

    async findByName(name: string) {

        const monster = this.items.find((item) => item.name === name)

        if (!monster) {
            return null
        }

        return monster
    }
}