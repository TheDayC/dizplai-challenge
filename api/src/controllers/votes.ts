import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { createVoteSchema } from '../utils/schemas';

const prisma = new PrismaClient();

export const createVote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = createVoteSchema.parse(req.body);
        const { id: pollId, username, optionSelected } = data;

        const vote = await prisma.votes.create({
            data: {
                pollId,
                date: new Date(),
                username,
                optionSelected,
            },
        });

        res.status(201).json(vote);
    } catch (err) {
        next(err);
    }
};

// On CTRL + C, tidy up the Prisma connection to avoid memory leaks.
process.on('SIGINT', async () => {
    console.log('🎬 Shutting down server...');
    await prisma.$disconnect();
    process.exit(0);
});

// On a linux kill command, tidy up the Prisma connection to avoid memory leaks.
process.on('SIGTERM', async () => {
    console.log('⛔️ Server terminated...');
    await prisma.$disconnect();
    process.exit(0);
});
