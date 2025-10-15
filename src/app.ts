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



export const app = fastify({
    logger: {
        level: env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport: env.NODE_ENV !== 'production' ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        } : undefined
    }
})

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
  origin: ["http://localhost:5173", "https://vite-ia-dex.vercel.app", "https://iadex.guilhermezaparoli.dev"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
})


app.register(MonstersRoutes)
app.register(UsersRoutes)

app.setErrorHandler((error, request, response) => {
    if (error instanceof ZodError) {
        app.log.warn({
            err: error,
            url: request.url,
            method: request.method
        }, 'Validation error');
        
        return response.status(400).send({
            message: 'Validation error',
            issues: error.format()
        })
    }

    if (error instanceof AppError) {
        app.log.warn({
            err: error,
            url: request.url,
            method: request.method,
            statusCode: error.statusCode
        }, `AppError: ${error.message}`);
        
        return response.status(error.statusCode).send({
            message: error.message
        })
    }

    // Log detalhado do erro 500
    app.log.error({
        err: error,
        url: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
        stack: error.stack
    }, 'Internal server error - 500');

    return response.status(500).send({
        message: 'Internal server error'
    })
})