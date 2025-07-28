import { Monster, Prisma } from "@/generated/prisma/index.js";
import { MonsterRepository } from "../monsters-repository.js";

export class InMemoryMonsterRepository

    implements MonsterRepository {
    public items: Monster[] = []
    private nexId = 1;

    async create({ story, image, name, type_id, user_id, id, description }: Prisma.MonsterUncheckedCreateInput) {

        const monster: Monster = {
            id: id ?? this.nexId,
            name,
            story,
            image,
            description,
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