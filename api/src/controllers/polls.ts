import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { pollSchema } from '../utils/schemas';

const prisma = new PrismaClient();

export const listPolls = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const polls = await prisma.polls.findMany();

        res.status(200).json(polls);
    } catch (err) {
        next(err);
    }
};

export const createPoll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = pollSchema.parse(req.body);
        const { name, date, options } = data;

        const poll = await prisma.polls.create({
            data: {
                name,
                date: new Date(date),
                options,
            },
        });

        res.status(201).json(poll);
    } catch (err) {
        next(err);
    }
};

export const getPollVotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pollId = z.coerce.number().parse(req.params.id);

        const votes = await prisma.votes.findMany({
            where: { pollId },
        });

        res.status(200).json(votes);
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
