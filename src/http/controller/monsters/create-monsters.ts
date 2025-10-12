import { ImageGenerationFailedError } from "@/usecases/error/ImageGenerationFailedError.js";
import { MonsterNameAlreadyExistsError } from "@/usecases/error/monster-name-already-exists-error-copy.js";
import { makeCreateMonsterUseCase } from "@/usecases/factories/make-create-monster.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { Types } from "@prisma/client";
import z from "zod";

export async function createMonster(req: FastifyRequest, res: FastifyReply) {

    const createMonsterSchema = z.object({
        name: z.string(),
        description: z.string(),
        story: z.string(),
        types: z.array(z.nativeEnum(Types))
    })




    try {
        const { name, description, story, types } = createMonsterSchema.parse(req.body)
        const createMonsterUserCase = makeCreateMonsterUseCase()
        const { monster } = await createMonsterUserCase.execute({
            name,
            description,
            story,
            types,
            user_id: req.user.sub
        })

        res.status(201).send({
            id: monster.id
        })
    } catch (error) {
        if (error instanceof MonsterNameAlreadyExistsError) {
            return res.status(409).send({ message: error.message })
        }


        if (error instanceof ImageGenerationFailedError) {
            return res.status(503).send({ message: error.message })
        }
    }

}