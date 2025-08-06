export class ImageGenerationFailedError extends Error {
    constructor() {
        super('Failed to generate monster image.');
    }
}