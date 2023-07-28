import { RequestHandler } from "express";

export const loggerMiddleware: RequestHandler = (req, _, next) => {
  console.log(
    `Path: ${req.path} | Method: ${req.method} | Body: ${JSON.stringify(
      req.body
    )}`
  );
  next();
};
