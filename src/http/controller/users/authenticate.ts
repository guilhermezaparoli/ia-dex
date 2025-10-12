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

    req.log.info({ email }, 'Authenticating user');

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
        email,
        password
    })

    req.log.info({ user_id: user.id, email: user.email }, 'User authenticated successfully');

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

    req.log.debug('JWT tokens generated');

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