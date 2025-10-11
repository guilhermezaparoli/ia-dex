import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { ChangePasswordUseCase } from "../change-password.js";

export function makeChangePassword() {
    const usersRepository = new PrismaUsersRepository();
    const changePasswordUseCase = new ChangePasswordUseCase(usersRepository);

    return {
        changePasswordUseCase,
    };
}
