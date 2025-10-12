import { makeFetchUserMonsters } from "@/usecases/factories/make-fetch-user-monsters.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { Types } from "@prisma/client";
import z from "zod";

export async function fetchUserMonsters(req: FastifyRequest, res: FastifyReply) {
    const fetchUserMonstersSchema = z.object({
        page: z.coerce.number().default(1),
        pageSize: z.coerce.number().default(10),
        types: z
            .union([z.nativeEnum(Types), z.array(z.nativeEnum(Types))])
            .optional(),
        search: z.string().optional(),
    });

    const { page, pageSize, types, search } = fetchUserMonstersSchema.parse(req.query);
    const { sub: userId } = req.user;

    const { fetchUserMonstersUseCase } = makeFetchUserMonsters();
    const normalizedTypes = types ? (Array.isArray(types) ? types : [types]) : [];

    const monstersResult = await fetchUserMonstersUseCase.execute({
        userId,
        page,
        pageSize,
        types: normalizedTypes,
        search,
    });

    res.status(200).send({
        ...monstersResult,
    });
}
