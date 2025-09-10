import { makeFetchMonsterByIdUseCase } from "@/usecases/factories/make-fetch-monster-by-id.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function fetchMonsterById(req: FastifyRequest, res: FastifyReply) {



    const paramsSchema = z.object({
        id: z.coerce.number()
    })


    const { id } = paramsSchema.parse(req.params)

    const fetchMonterByIdUseCase = makeFetchMonsterByIdUseCase()


    const { monster } = await fetchMonterByIdUseCase.execute(id)


    return res.status(200).send({
        monster
    })
}