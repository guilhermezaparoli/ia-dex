import fastify from "fastify";
import { AppRoutes } from "./http/routes.js";
import { env } from "./env/index.js";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})
app.register(AppRoutes)

app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error',
            issues: error.format()
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: Here we should log to an external tool like datadog/NewRelic/Sentry
    }

    return response.status(500).send({
        message: error.message
    })
})