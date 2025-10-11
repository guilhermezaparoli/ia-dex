import { AppError } from "./app-error.js";

export class UserEmailAlreadyExistsError extends AppError {
    constructor() {
        super('E-mail already exists!', 409);
    }
}