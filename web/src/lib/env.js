import * as z from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url(),
});

export const env = envSchema.parse({
  BASE_URL: import.meta.env.VITE_DB_BASE_URL,
});
