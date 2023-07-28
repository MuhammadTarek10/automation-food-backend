import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  console.log(`Uncaught exception: ${err}`);
  return res
    .status(500)
    .send("Oops, an unexpected error occurred, please try again");
};
