import { makeCreateMonsterUseCase } from "@/usecases/factories/make-create-monster.js";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function monsters(req: FastifyRequest, res: FastifyReply) {

    const createMonsterSchema = z.object({
        name: z.string(),
        description: z.string(),
        story: z.string(),
        type_id: z.number()
    })

    const { name, description, story, type_id } = createMonsterSchema.parse(req.body)


    const createMonsterUserCase = makeCreateMonsterUseCase()


    const createdMonster = await createMonsterUserCase.execute({
        name,
        description,
        story,
        type_id,
        user_id: randomUUID()
    })

    res.send(createdMonster)
}