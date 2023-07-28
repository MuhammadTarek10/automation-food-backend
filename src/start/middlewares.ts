import { Express } from "express";
import { errorMiddleware } from "../middlewares/error.middleware";
import { loggerMiddleware } from "../middlewares/logger.middleware";

export default function middlewares(app: Express) {
  app.use(loggerMiddleware);
  app.use(errorMiddleware);
}
