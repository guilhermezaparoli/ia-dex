import { AppError } from "./app-error.js";

export class TypeNameAlreadyExistsError extends AppError {
    constructor() {
        super('Type name already exists!', 409);
    }
}