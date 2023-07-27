import { Express } from "express";
import { App, BasePoints } from "../config/api/endpoints";
import userRouter from "../router/user.router";
import cors from "./cors";
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
  app.use(`${BASE}/${BasePoints.USER}`, userRouter);
  // app.use(`${BASE}/${BasePoints.FOOD}`, foodRouter);
  // app.use(`${BASE}/${BasePoints.ROOM}`, roomRouter);
}
