import { makeFetchUser } from "@/usecases/factories/make-fetch-user.js";
import { FastifyReply, FastifyRequest } from "fastify";


export async function fetchUser(req: FastifyRequest, res: FastifyReply) {


    const { sub } = req.user

    const { fetchUserUseCase } = makeFetchUser()

    const { user } = await fetchUserUseCase.exec(sub)

    const safeUser = {
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    };

    res.status(200).send({
        user: safeUser
    })
}