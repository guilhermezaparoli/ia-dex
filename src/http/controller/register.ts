import { makeRegisterUseCase } from "@/usecases/factories/make-register.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {


    const registerSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string()
    })

    const { email, name, password } = registerSchema.parse(req.body)
    const registerUseCase = makeRegisterUseCase()

   const { user } = await registerUseCase.execute({
        email,
        name,
        password
    })

    return res.status(200).send({
        user
    })

}