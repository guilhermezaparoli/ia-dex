import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, res: FastifyReply) {

    await req.jwtVerify({
        onlyCookie: true
    })

    const { sub } = req.user

    const token = await res.jwtSign({}, {
        sign: {
            sub,
            expiresIn: '10m'
        }
    })
    
    const refreshToken = await res.jwtSign({}, {
        sign: {
            sub,
            expiresIn: '7d'
        }
    })

    return res.setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "lax",
        httpOnly: true,
    }).status(200).send({
        token
    })

}