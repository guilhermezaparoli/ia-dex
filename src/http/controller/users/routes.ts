import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate.js"
import { register } from "./register.js"
import { refresh } from "./refresh.js"

export function UsersRoutes(app: FastifyInstance){

        app.post("/register", register)
        app.post("/auth", authenticate)
    
        app.patch("/token/refresh", refresh)
}