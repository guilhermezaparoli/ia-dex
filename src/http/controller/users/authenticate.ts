import { AUTHENTICATION_TIME } from "@/constants/authentication.js";
import { env } from "@/env/index.js";
import { makeAuthenticateUseCase } from "@/usecases/factories/make-authenticate.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {

    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { email, password } = authenticateSchema.parse(req.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
        email,
        password
    })

    const token = await res.jwtSign({}, {
        sign: {
            sub: user.id,
            expiresIn: AUTHENTICATION_TIME.TOKEN
        }
    })

    const refreshToken = await res.jwtSign({}, {
        sign: {
            sub: user.id,
            expiresIn: AUTHENTICATION_TIME.REFRESH_TOKEN
        }
    })

    return res.setCookie("refreshToken", refreshToken, {
        path: "/",
        sameSite: env.NODE_ENV === "production",
        httpOnly: true,
        secure: true,
        maxAge: AUTHENTICATION_TIME.REFRESH_TOKEN
    }).status(200).send({
        token
    })

}