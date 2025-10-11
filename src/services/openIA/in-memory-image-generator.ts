import { ImageGeneratorService } from "./image-generator-service.js";

export class InMeMoryImageGenerator implements ImageGeneratorService {

    async generateImage(prompt: string): Promise<string> {
        // Return a valid data URL with a 1x1 transparent pixel
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    }
}