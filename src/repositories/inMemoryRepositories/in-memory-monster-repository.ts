
import { Monster, Prisma } from "prisma/generated/prisma/index.js";
import { FindManyParams, MonsterRepository } from "../monsters-repository.js";


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

    async findMany({ page, pageSize, typeId }: FindManyParams) {
        let monstersToFilter = this.items

        if (typeId) {
            monstersToFilter = monstersToFilter.filter((item) => item.type_id === typeId)
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedMonster = monstersToFilter.slice(startIndex, endIndex)

        return paginatedMonster
    }
}