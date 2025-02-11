import express from "express";
import { getPolls, getPollById, createPoll } from "../controllers/events";

const router = express.Router();

router.get("/", getPolls);
router.get("/:id", getPollById);
router.get("/:id/votes", getPollById);
router.post("/new", createPoll);

export default router;
