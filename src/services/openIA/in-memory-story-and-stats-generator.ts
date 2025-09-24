import { StoryAndStats } from "./open-ia-story-and-stats-generator-service.js";
import { StoryAndStatsGeneratorService } from "./story-and-stats-generator.js";

export class InMeMoryStoryAndStatsGenerator implements StoryAndStatsGeneratorService {

    async generateStoryAndStats(): Promise<StoryAndStats> {

        return {
            story: "teste",
            stats: {
                attack: 10,
                defense: 10,
                hp: 10,
                special_attack: 100,
                special_defense: 100,
                speed: 10
            }
        }

    }
}