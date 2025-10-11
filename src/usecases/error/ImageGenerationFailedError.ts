import { AppError } from "./app-error.js";

export class ImageGenerationFailedError extends AppError {
    constructor() {
        super('Failed to generate monster image.', 502);
    }
}