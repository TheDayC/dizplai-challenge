import { z } from 'zod';

export const pollSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.string(),
    options: z.array(z.string()),
});

export const voteSchema = z.object({
    id: z.number(),
    pollId: z.number(),
    date: z.string(),
    username: z.string(),
    optionSelected: z.string(),
});

export const votesSchema = z.array(voteSchema);
