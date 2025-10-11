import { FastifyInstance } from "fastify";
import { fetchMonsters } from "./fetch-monsters.js";
import { fetchMonsterById } from "./fetch-monster-by-id.js";
import { fetchUserMonsters } from "./fetch-user-monsters.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { createMonster } from "./create-monsters.js";

export function MonstersRoutes(app: FastifyInstance) {

    app.get("/monsters", fetchMonsters)
    app.get("/monster/:id", fetchMonsterById)

    app.get("/monsters/me", {
        onRequest: [verifyJWT]
    }, fetchUserMonsters)

    app.post("/monsters/create", {
        onRequest: [verifyJWT]
    }, createMonster)
}