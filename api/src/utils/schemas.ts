import { z } from 'zod';

export const pollSchema = z.object({
    name: z.string(),
    date: z.string(),
    options: z.array(z.string()),
});

export const createVoteSchema = z.object({
    id: z.number(),
    username: z.string(),
    optionSelected: z.string(),
});
