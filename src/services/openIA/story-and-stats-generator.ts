interface StoryAndStats {
    story: string;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
        special_attack: number;
        special_defense: number;
    }
}

export interface StoryAndStatsGeneratorService {
    generateStoryAndStats(prompt: string): Promise<StoryAndStats>
}