import { makeAuthenticateUseCase } from "@/usecases/factories/make-authenticate.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {


    console.log(req.body);
    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { email, password } = authenticateSchema.parse(req.body)
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
        email,
        password
    })

    return res.status(200).send({
        user
    })

}