import { makeFetchMonstersUseCase } from "@/usecases/factories/make-fetch-monsters.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function fetchMonsters(req: FastifyRequest, res: FastifyReply) {





    const fetchMonsterSchema = z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
        typeId: z.coerce.number().optional()

    })

    const { page, pageSize, typeId } = fetchMonsterSchema.parse(req.query)
    const fetchMonstersUseCase = makeFetchMonstersUseCase()
    const { monsters } = await fetchMonstersUseCase.execute({ page, pageSize, typeId })
    
    res.status(200).send({
        monsters
    })

}