import { makeFetchUser } from "@/usecases/factories/make-fetch-user.js";
import { FastifyReply, FastifyRequest } from "fastify";


export async function fetchUser(req: FastifyRequest, res: FastifyReply) {



    const { fetchUserUseCase } = makeFetchUser()

    const { user } = await fetchUserUseCase.exec(req.user.sub)

    res.status(200).send({
        user
    })
}