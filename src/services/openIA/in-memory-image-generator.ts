import { ImageGeneratorService } from "./image-generator-service.js";

export class InMeMoryImageGenerator implements ImageGeneratorService {

    async generateImage(prompt: string): Promise<string> {
        
        return 'url'
    }
}