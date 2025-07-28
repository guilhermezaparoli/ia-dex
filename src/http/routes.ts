import { FastifyInstance } from "fastify";
import { monsters } from "./controller/monsters.js";


export function AppRoutes(app: FastifyInstance) {


    app.post("/create-monster",monsters)
}