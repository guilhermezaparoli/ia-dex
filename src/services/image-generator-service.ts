export interface ImageGeneratorService {
    generateImage(prompt: string): Promise<string>
}