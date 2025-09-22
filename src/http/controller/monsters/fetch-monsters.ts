import { makeFetchMonstersUseCase } from "@/usecases/factories/make-fetch-monsters.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { Types } from "prisma/generated/prisma/index.js";
import z from "zod";

export async function fetchMonsters(req: FastifyRequest, res: FastifyReply) {

    const fetchMonsterSchema = z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
        types: z.union([z.nativeEnum(Types), z.array(z.nativeEnum(Types))]).optional()

    })
console.log(req.query);
    const { page, pageSize, types } = fetchMonsterSchema.parse(req.query)
    const fetchMonstersUseCase = makeFetchMonstersUseCase()
    const normalizedTypes = types ? Array.isArray(types) ? types : [types] :[]
    console.log(normalizedTypes);
    const monstersResult  = await fetchMonstersUseCase.execute({ page, pageSize, types: normalizedTypes })
    
    
    res.status(200).send({
        ...monstersResult
    })

}