import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate.js"
import { register } from "./register.js"
import { refresh } from "./refresh.js"
import { fetchUser } from "./fetch-user.js"

export function UsersRoutes(app: FastifyInstance){

        app.post("/register", register)
        app.post("/auth", authenticate)

        app.get('/me', fetchUser)
    
        app.patch("/token/refresh", refresh)
}