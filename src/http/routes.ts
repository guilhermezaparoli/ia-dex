import { FastifyInstance } from "fastify";
import { register } from "./controller/register.js";
import { authenticate } from "./controller/authenticate.js";
import { verifyJWT } from "./middlewares/verify-jwt.js";
import { createMonster } from "./controller/create-monsters.js";
import { createType } from "./controller/create-type.js";
import { fetchTypes } from "./controller/fetch-types.js";
import { fetchMonsters } from "./controller/fetch-monsters.js";
import { fetchMonsterById } from "./controller/fetch-monster-by-id.js";
import { refresh } from "./controller/refresh.js";


export function AppRoutes(app: FastifyInstance) {


    app.post("/register", register)
    app.post("/auth", authenticate)
    app.get("/types", fetchTypes)
    app.get("/monsters", fetchMonsters)
    app.get("/monster/:id", fetchMonsterById)

    app.post("/monsters/create", {
        onRequest: [verifyJWT]
    }, createMonster)
    app.post("/types/create", {
        onRequest: [verifyJWT]
    }, createType)

    app.patch("/token/refresh", refresh)
}