import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate.js"
import { register } from "./register.js"
import { refresh } from "./refresh.js"
import { fetchUser } from "./fetch-user.js"
import { logout } from "./log-out.js"
import { verifyJWT } from "@/http/middlewares/verify-jwt.js"

export function UsersRoutes(app: FastifyInstance) {

        app.post("/register", register)
        app.post("/auth", authenticate)
        app.post("/logout", logout)

        app.get('/me', {
                onRequest: [verifyJWT]
        }, fetchUser)

        app.patch("/token/refresh", refresh)
}