import express from "express";
import cors from "cors";
import * as entries from "./db/entries.json";

import pollRoutes from "./routes/polls";
import logger from "./utils/logger";
import { errorLogger, requestLogger } from "./middleware/logger";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(errorLogger);

app.use("/polls", pollRoutes);

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  console.log(entries);
});
