import { AUTHENTICATION_TIME } from "@/constants/authentication.js";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, res: FastifyReply) {

    await req.jwtVerify({
        onlyCookie: true
    })

    const { sub } = req.user

    const token = await res.jwtSign({}, {
        sign: {
            sub,
            expiresIn: AUTHENTICATION_TIME.TOKEN
        }
    })
    
    const refreshToken = await res.jwtSign({}, {
        sign: {
            sub,
            expiresIn: AUTHENTICATION_TIME.REFRESH_TOKEN
        }
    })

    return res.setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        httpOnly: true,
        maxAge: AUTHENTICATION_TIME.REFRESH_TOKEN
    }).status(200).send({
        token
    })

}