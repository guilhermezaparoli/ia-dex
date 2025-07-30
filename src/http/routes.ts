import { FastifyInstance } from "fastify";

import { register } from "./controller/register.js";
import { authenticate } from "./controller/authenticate.js";
import { verifyJWT } from "./middlewares/verify-jwt.js";
import { createMonster } from "./controller/create-monsters.js";
import { createType } from "./controller/create-type.js";


export function AppRoutes(app: FastifyInstance) {


    app.post("/register", register)
    app.post("/auth", authenticate)

    app.post("/monsters/create", {
        onRequest: [verifyJWT]
    }, createMonster)
    app.post("/types/create", {
        onRequest: [verifyJWT]
    }, createType)
}