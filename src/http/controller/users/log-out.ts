import { FastifyReply, FastifyRequest } from "fastify";

export async function logout(_req: FastifyRequest, res: FastifyReply) {

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    })

    res.status(200).send( { message: "Logged out successfully"})
}