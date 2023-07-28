import { Express } from "express";
import asyncHandler from "express-async-handler";
import { App, BasePoints } from "../config/api/endpoints";
import userRouter from "../router/user.router";
import cors from "./cors";
import middlewares from "./middlewares";
import parser from "./parser";
import swagger from "./swagger-custom";
// import userRouter from "../router/user.router.js";
// import foodRouter from "../router/food.router.js";
// import roomRouter from "../router/room.router.js";

const BASE = `/${App.BASE}/${App.VERSION}`;

export default function (app: Express): void {
  cors(app);
  parser(app);
  swagger(app);
  middlewares(app);
  app.use(`${BASE}/${BasePoints.USER}`, asyncHandler(userRouter));
  // app.use(`${BASE}/${BasePoints.FOOD}`, foodRouter);
  // app.use(`${BASE}/${BasePoints.ROOM}`, roomRouter);
}
