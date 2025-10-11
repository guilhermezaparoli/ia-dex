import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyRateLimit from "@fastify/rate-limit";
import fastify from "fastify";
import multipart from "fastify-multipart";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import { MonstersRoutes } from "./http/controller/monsters/routes.js";
import { UsersRoutes } from "./http/controller/users/routes.js";
import { AppError } from "./usecases/error/app-error.js";



export const app = fastify()

app.register(multipart)

app.register(fastifyRateLimit, {
    max: 40,
    timeWindow: 1000 * 60
})
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
    
})
app.register(fastifyCookie)
app.register(cors, {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["PATCH"]
})

app.register(MonstersRoutes)
app.register(UsersRoutes)

app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error',
            issues: error.format()
        })
    }

    if (error instanceof AppError) {
        return response.status(error.statusCode).send({
            message: error.message
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: Here we should log to an external tool like datadog/NewRelic/Sentry
    }

    return response.status(500).send({
        message: 'Internal server error'
    })
})