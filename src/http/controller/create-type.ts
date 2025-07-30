import { makeCreateType } from "@/usecases/factories/make-create-type.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createType(req: FastifyRequest, res: FastifyReply) {


    const createTypeSchema = z.object({
        name: z.string()
    })

    const { name } = createTypeSchema.parse(req.body)

    const createTypeUseCase = makeCreateType()

    const { type } = await createTypeUseCase.execute({ name })

    return {
        type
    }
}