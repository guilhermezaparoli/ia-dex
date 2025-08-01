import "dotenv/config"
import z from "zod"


const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
    PORT: z.coerce.number().default(5555),
    DATABASE_URL: z.string(),
    OPENAI_API_KEY: z.string(),
    JWT_SECRET: z.string()
})


const _env = envSchema.safeParse(process.env)


if (_env.success === false) {
  console.log('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
