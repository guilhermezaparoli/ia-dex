import { AppError } from "./app-error.js";

export class UserNameAlreadyExistsError extends AppError {
    constructor() {
        super('Username already exists', 409);
    }
}