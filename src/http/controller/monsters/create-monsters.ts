import { ImageGenerationFailedError } from "@/usecases/error/ImageGenerationFailedError.js";
import { MonsterNameAlreadyExistsError } from "@/usecases/error/monster-name-already-exists-error-copy.js";
import { ContentPolicyViolationError } from "@/usecases/error/content-policy-violation-error.js";
import { makeCreateMonsterUseCase } from "@/usecases/factories/make-create-monster.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { Types } from "@prisma/client";
import z from "zod";

export async function createMonster(req: FastifyRequest, res: FastifyReply) {

    const createMonsterSchema = z.object({
        name: z.string(),
        description: z.string(),
        story: z.string().optional(),
        types: z.array(z.nativeEnum(Types))
    })




    try {
        const { name, description, story, types } = createMonsterSchema.parse(req.body)
        
        req.log.info({
            name,
            types,
            user_id: req.user.sub
        }, 'Creating monster');
        
        const createMonsterUserCase = makeCreateMonsterUseCase()
        const { monster } = await createMonsterUserCase.execute({
            name,
            description,
            types,
            user_id: req.user.sub
        })

        req.log.info({
            monster_id: monster.id,
            name: monster.name
        }, 'Monster created successfully');

        res.status(201).send({
            id: monster.id
        })
    } catch (error) {
        if (error instanceof MonsterNameAlreadyExistsError) {
            req.log.warn({ error: error.message }, 'Monster name already exists');
            return res.status(409).send({ message: error.message })
        }

        if (error instanceof ContentPolicyViolationError) {
            req.log.warn({ error: error.message }, 'Content policy violation');
            return res.status(400).send({ message: error.message })
        }

        if (error instanceof ImageGenerationFailedError) {
            req.log.error({ error: error.message }, 'Image generation failed');
            return res.status(503).send({ message: error.message })
        }
        
        // Re-throw para o error handler global capturar
        throw error;
    }

}