import express from 'express';
import { listPolls, createPoll, getPollVotes } from '../controllers/polls';

const router = express.Router();

router.get('/list', listPolls);
router.post('/new', createPoll);
router.get('/:id/votes', getPollVotes);

export default router;
