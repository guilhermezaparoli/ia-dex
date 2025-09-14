import OpenAI from "openai";
import { StoryAndStatsGeneratorService } from "./story-and-stats-generator.js";

export interface StoryAndStats {
  story: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    special_attack: number;
    special_defense: number;
  };
}

export class OpenAIStoryAndStatsGeneratorService
  implements StoryAndStatsGeneratorService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateStoryAndStats(prompt: string): Promise<StoryAndStats> {
    const response = await this.openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          strict: true,
          name: "story_and_stats_schema",
          schema: {
            type: "object",
            properties: {
              story: { type: "string" },
              stats: {
                type: "object",
                properties: {
                  hp: { type: "number", minimum: 1, maximum: 255 },
                  attack: { type: "number", minimum: 1, maximum: 255 },
                  defense: { type: "number", minimum: 1, maximum: 255 },
                  speed: { type: "number", minimum: 1, maximum: 255 },
                  special_attack: { type: "number", minimum: 1, maximum: 255 },
                  special_defense: { type: "number", minimum: 1, maximum: 255 },
                },
                required: [
                  "hp",
                  "attack",
                  "defense",
                  "speed",
                  "special_attack",
                  "special_defense",
                ],
                additionalProperties: false,
              },
            },
            required: ["story", "stats"],
            additionalProperties: false,
          },
        },
      },
    });

    const result = JSON.parse(response.output_text)

    return result;
  }
}
