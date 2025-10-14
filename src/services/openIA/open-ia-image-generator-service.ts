import OpenAI from "openai";
import { ImageGeneratorService } from "./image-generator-service.js";
import { ContentPolicyViolationError } from "@/usecases/error/content-policy-violation-error.js";

export class OpenAIImageGeneratorService implements ImageGeneratorService {
    private openai: OpenAI

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey })
    }


    async generateImage(prompt: string): Promise<string> {
        console.log('gerando imagem');

        try {
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
        } catch (error: any) {
            // Verifica se é um erro de violação de política de conteúdo
            if (error?.code === 'content_policy_violation' || error?.status === 400) {
                throw new ContentPolicyViolationError()
            }
            // Re-lança outros erros
            throw error
        }
    }
}