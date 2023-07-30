import { RequestHandler } from "express";
import { LoggerService } from "../services/logger.service";

const logger = new LoggerService("master");

export const loggerMiddleware: RequestHandler = (req, _, next) => {
  logger.info(
    `Path: ${req.path} | Method: ${req.method} | Body: ${JSON.stringify(
      req.body
    )}`
  );
  next();
};
