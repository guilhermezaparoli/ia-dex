
import { Monster, Prisma, Types } from "@prisma/client";
import { FindManyParams, MonsterRepository } from "../monsters-repository.js";


export class InMemoryMonsterRepository

    implements MonsterRepository {
    public items: Monster[] = []
    private nexId = 1;

    async create({ story, image, name, types, user_id, id, description, attack, defense,hp, special_attack, special_defense, speed }: Prisma.MonsterUncheckedCreateInput) {

      
        let typesArray: Types[] = [];
        if (types) {
            if (Array.isArray(types)) {
                typesArray = types;
            } else if (typeof types === 'object' && 'set' in types) {
                typesArray = types.set;
            }
        }

        const monster: Monster = {
            id: id ?? this.nexId,
            name,
            story: story ?? null,
            attack: attack ?? null,
            defense: defense ?? null,
            hp: hp ?? null,
            special_attack: special_attack ?? null,
            special_defense: special_defense ?? null,
            speed: speed ?? null,
            image,
            description,
            types: typesArray,
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

    async findMany({ page, pageSize, types }: FindManyParams) {
        let monstersToFilter = this.items

        if (types && types.length > 0) {
            monstersToFilter = monstersToFilter.filter((item) =>
                types.every((type) => item.types.includes(type))
            )
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedMonster = monstersToFilter.slice(startIndex, endIndex)
        const totalItems = monstersToFilter.length


        return {
            monsters: paginatedMonster,
            pagination: {
                page,
                pageSize,
                totalItems
            }
        }
    }

    async findById(id: number) {

        const monster = this.items.find((monster) => monster.id === id)

        if (!monster) {
            return null
        }

        return monster

    }

    async findByUserId(userId: string, { page, pageSize, types, search }: FindManyParams) {
        let monstersToFilter = this.items.filter((item) => item.user_id === userId)

        if (types && types.length > 0) {
            monstersToFilter = monstersToFilter.filter((item) =>
                types.every((type) => item.types.includes(type))
            )
        }

        if (search) {
            monstersToFilter = monstersToFilter.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedMonster = monstersToFilter.slice(startIndex, endIndex)
        const totalItems = monstersToFilter.length

        return {
            monsters: paginatedMonster,
            pagination: {
                page,
                pageSize,
                totalItems
            }
        }
    }
}