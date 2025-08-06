import { ImageGenerationFailedError } from "@/usecases/error/ImageGenerationFailedError.js";
import { MonsterNameAlreadyExistsError } from "@/usecases/error/monster-name-already-exists-error-copy.js";
import { makeCreateMonsterUseCase } from "@/usecases/factories/make-create-monster.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createMonster(req: FastifyRequest, res: FastifyReply) {

    const createMonsterSchema = z.object({
        name: z.string(),
        description: z.string(),
        story: z.string(),
        type_id: z.number()
    })




    try {
        const { name, description, story, type_id } = createMonsterSchema.parse(req.body)
        const createMonsterUserCase = makeCreateMonsterUseCase()
        const createdMonster = await createMonsterUserCase.execute({
            name,
            description,
            story,
            type_id,
            user_id: req.user.sub
        })

        res.status(201).send(createdMonster)
    } catch (error) {
        if (error instanceof MonsterNameAlreadyExistsError) {
            return res.status(409).send({ message: error.message })
        }


        if (error instanceof ImageGenerationFailedError) {
            return res.status(503).send({ message: error.message })
        }
    }

}