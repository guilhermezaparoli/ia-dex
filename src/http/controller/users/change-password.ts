import { makeChangePassword } from "@/usecases/factories/make-change-password.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function changePassword(req: FastifyRequest, res: FastifyReply) {
    const changePasswordSchema = z.object({
        currentPassword: z.string().min(8),
        newPassword: z.string().min(8),
    });

    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);

    const { sub: userId } = req.user;

    const { changePasswordUseCase } = makeChangePassword();

    await changePasswordUseCase.execute({
        userId,
        currentPassword,
        newPassword,
    });

    return res.status(200).send({
        message: "Password changed successfully",
    });
}
