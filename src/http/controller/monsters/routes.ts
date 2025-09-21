import { FastifyInstance } from "fastify";
import { fetchMonsters } from "./fetch-monsters.js";
import { fetchMonsterById } from "./fetch-monster-by-id.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { createMonster } from "./create-monsters.js";

export function MonstersRoutes(app: FastifyInstance) {

    app.get("/monsters", fetchMonsters)
    app.get("/monster/:id", fetchMonsterById)

    app.post("/monsters/create", {
        onRequest: [verifyJWT]
    }, createMonster)
}