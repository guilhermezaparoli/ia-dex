import { AppError } from "./app-error.js";

export class MonsterNameAlreadyExistsError extends AppError {
    constructor() {
        super('Monster name already exists!', 409);
    }
}