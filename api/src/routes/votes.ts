import express from 'express';
import { createVote } from '../controllers/votes';

const router = express.Router();

router.post('/new', createVote);

export default router;
