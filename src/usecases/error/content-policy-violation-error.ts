import { AppError } from "./app-error.js";

export class ContentPolicyViolationError extends AppError {
    constructor() {
        super('Your request violated our content policy.', 400);
    }
}
