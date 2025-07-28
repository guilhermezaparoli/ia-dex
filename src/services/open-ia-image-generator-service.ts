import OpenAI from "openai";
import { ImageGeneratorService } from "./image-generator-service.js";






export class OpenAIImageGeneratorService implements ImageGeneratorService {
    private openai: OpenAI

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey })
    }


    async generateImage(prompt: string): Promise<string> {
        console.log('gerando imagem');

        const response = await this.openai.images.generate({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: "1024x1024"
        })

        const imageUrl = response.data ? response.data[0]?.url : null

        if(!imageUrl) {
            throw new Error("Image URL not found in OpenIA response")
        }

        return imageUrl
    }
}