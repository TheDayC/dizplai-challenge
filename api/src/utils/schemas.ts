import { z } from 'zod';

export const pollSchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.string(),
    description: z.string(),
});

export const dbSchema = z.object({
    polls: z.array(pollSchema),
});
