import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserMonstersUseCase } from "./fetch-user-monsters.js";
import { MonsterRepository } from "@/repositories/monsters-repository.js";
import { InMemoryMonsterRepository } from "@/repositories/inMemoryRepositories/in-memory-monster-repository.js";
import { Types } from "@prisma/client";
import { faker } from "@faker-js/faker";

let monsterRepository: MonsterRepository;
let sut: FetchUserMonstersUseCase;

describe("Fetch User Monsters Use Case", () => {
    beforeEach(() => {
        monsterRepository = new InMemoryMonsterRepository();
        sut = new FetchUserMonstersUseCase(monsterRepository);
    });

    it("should be able to fetch monsters created by a specific user", async () => {
        const userId = faker.string.uuid();
        const otherUserId = faker.string.uuid();

        await monsterRepository.create({
            name: "Pikachu",
            description: "Electric mouse",
            story: "Story 1",
            image: "image1.png",
            types: [Types.ELECTRIC],
            user_id: userId,
            hp: 100,
            attack: 55,
            defense: 40,
            speed: 90,
            special_attack: 50,
            special_defense: 50,
        });

        await monsterRepository.create({
            name: "Charmander",
            description: "Fire lizard",
            story: "Story 2",
            image: "image2.png",
            types: [Types.FIRE],
            user_id: userId,
            hp: 100,
            attack: 52,
            defense: 43,
            speed: 65,
            special_attack: 60,
            special_defense: 50,
        });

        await monsterRepository.create({
            name: "Squirtle",
            description: "Water turtle",
            story: "Story 3",
            image: "image3.png",
            types: [Types.WATER],
            user_id: otherUserId,
            hp: 100,
            attack: 48,
            defense: 65,
            speed: 43,
            special_attack: 50,
            special_defense: 64,
        });

        const result = await sut.execute({
            userId,
            page: 1,
            pageSize: 10,
        });

        expect(result.monsters).toHaveLength(2);
        expect(result.monsters[0].name).toBe("Pikachu");
        expect(result.monsters[1].name).toBe("Charmander");
        expect(result.pagination.totalItems).toBe(2);
    });

    it("should return empty list when user has no monsters", async () => {
        const userId = faker.string.uuid();
        const otherUserId = faker.string.uuid();

        await monsterRepository.create({
            name: "Pikachu",
            description: "Electric mouse",
            story: "Story 1",
            image: "image1.png",
            types: [Types.ELECTRIC],
            user_id: otherUserId,
            hp: 100,
            attack: 55,
            defense: 40,
            speed: 90,
            special_attack: 50,
            special_defense: 50,
        });

        const result = await sut.execute({
            userId,
            page: 1,
            pageSize: 10,
        });

        expect(result.monsters).toHaveLength(0);
        expect(result.pagination.totalItems).toBe(0);
    });

    it("should be able to filter user monsters by type", async () => {
        const userId = faker.string.uuid();

        await monsterRepository.create({
            name: "Pikachu",
            description: "Electric mouse",
            story: "Story 1",
            image: "image1.png",
            types: [Types.ELECTRIC],
            user_id: userId,
            hp: 100,
            attack: 55,
            defense: 40,
            speed: 90,
            special_attack: 50,
            special_defense: 50,
        });

        await monsterRepository.create({
            name: "Charmander",
            description: "Fire lizard",
            story: "Story 2",
            image: "image2.png",
            types: [Types.FIRE],
            user_id: userId,
            hp: 100,
            attack: 52,
            defense: 43,
            speed: 65,
            special_attack: 60,
            special_defense: 50,
        });

        const result = await sut.execute({
            userId,
            page: 1,
            pageSize: 10,
            types: [Types.ELECTRIC],
        });

        expect(result.monsters).toHaveLength(1);
        expect(result.monsters[0].name).toBe("Pikachu");
    });

    it("should be able to search user monsters by name", async () => {
        const userId = faker.string.uuid();

        await monsterRepository.create({
            name: "Pikachu",
            description: "Electric mouse",
            story: "Story 1",
            image: "image1.png",
            types: [Types.ELECTRIC],
            user_id: userId,
            hp: 100,
            attack: 55,
            defense: 40,
            speed: 90,
            special_attack: 50,
            special_defense: 50,
        });

        await monsterRepository.create({
            name: "Charmander",
            description: "Fire lizard",
            story: "Story 2",
            image: "image2.png",
            types: [Types.FIRE],
            user_id: userId,
            hp: 100,
            attack: 52,
            defense: 43,
            speed: 65,
            special_attack: 60,
            special_defense: 50,
        });

        const result = await sut.execute({
            userId,
            page: 1,
            pageSize: 10,
            search: "pika",
        });

        expect(result.monsters).toHaveLength(1);
        expect(result.monsters[0].name).toBe("Pikachu");
    });

    it("should be able to paginate user monsters", async () => {
        const userId = faker.string.uuid();

        for (let i = 1; i <= 5; i++) {
            await monsterRepository.create({
                name: `Monster ${i}`,
                description: `Description ${i}`,
                story: `Story ${i}`,
                image: `image${i}.png`,
                types: [Types.NORMAL],
                user_id: userId,
                hp: 100,
                attack: 50,
                defense: 50,
                speed: 50,
                special_attack: 50,
                special_defense: 50,
            });
        }

        const resultPage1 = await sut.execute({
            userId,
            page: 1,
            pageSize: 2,
        });

        expect(resultPage1.monsters).toHaveLength(2);
        expect(resultPage1.pagination.totalItems).toBe(5);
        expect(resultPage1.pagination.page).toBe(1);

        const resultPage2 = await sut.execute({
            userId,
            page: 2,
            pageSize: 2,
        });

        expect(resultPage2.monsters).toHaveLength(2);
        expect(resultPage2.pagination.page).toBe(2);
    });
});
