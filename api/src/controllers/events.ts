import { z } from "zod";
import { NextFunction, Request, Response } from "express";
// import { v4 as uuidv4 } from 'uuid';

import { readDB, writeDB } from "../services/database";
import { pollSchema } from "../utils/schemas";

export const getPolls = (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = readDB();
    const polls = z.array(pollSchema).parse(db.polls); // Parse the polls object from the JSON as a specific poll schema.

    res.status(200).json(polls);
  } catch (err) {
    next(err); // Catch the error, send to the logger and move on.
  }
};

export const getPollById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = readDB(); // Read all DB entries, we'd filter this with a query in a real database.
    const id = z.string().parse(req.params.id); // Parse the id sent in the request as a number.
    const polls = z.array(pollSchema).parse(db.polls); // Parse the polls object from the JSON as a specific poll schema.
    const poll = polls.find((e) => e.id === id); // Find the poll requested by id.

    // Should the poll exist then return it, else inform the UI that it doesn't exist.
    if (poll) {
      res.status(200).json(poll);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    next(err); // Catch the error, send to the logger and move on.
  }
};

export const getPollVotes = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = readDB(); // Read all DB entries, we'd filter this with a query in a real database.
    const id = z.string().parse(req.params.id); // Parse the id sent in the request as a number.
    const polls = z.array(pollSchema).parse(db.polls); // Parse the polls object from the JSON as a specific poll schema.
    const poll = polls.find((e) => e.id === id); // Find the poll requested by id.

    // Should the poll exist then return it, else inform the UI that it doesn't exist.
    if (poll) {
      res.status(200).json(poll);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    next(err); // Catch the error, send to the logger and move on.
  }
};

export const createPoll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = readDB();

    // Write the newly modified db object back to the json file.
    writeDB(db);

    res.status(201).json({ message: "Event created!" });
  } catch (err) {
    next(err); // Catch the error, send to the logger and move on.
  }
};
