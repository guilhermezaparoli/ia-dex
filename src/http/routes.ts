import { FastifyInstance } from "fastify";
import { monsters } from "./controller/monsters.js";
import { register } from "./controller/register.js";


export function AppRoutes(app: FastifyInstance) {


    app.post("/register", register)
    app.post("/create-monster",monsters)
}