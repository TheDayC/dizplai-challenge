import express from 'express';
import { listPolls, createPoll, getPollVotes, getPoll } from '../controllers/polls';

const router = express.Router();

router.get('/list', listPolls);
router.get('/:id', getPoll);
router.post('/new', createPoll);
router.get('/:id/votes', getPollVotes);

export default router;
