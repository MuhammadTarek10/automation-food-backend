import { config } from "dotenv";
import { Express } from "express";
import asyncHandler from "express-async-handler";
import { App, BasePoints } from "../config/api/endpoints";
import { jwtMiddleware } from "../middlewares/auth.middleware";
import foodRouter from "../router/food.router";
import orderRouter from "../router/order.router";
import roomRouter from "../router/room.router";
import userRouter from "../router/user.router";
import cors from "./cors";
import middlewares from "./middlewares";
import parser from "./parser";
import swagger from "./swagger-custom";
config();

const BASE = `/${App.BASE}/${App.VERSION}`;

export default function (app: Express): void {
  cors(app);
  parser(app);
  if (process.env.ENV == "development") swagger(app);
  middlewares(app);
  app.use(`${BASE}/${BasePoints.USER}`, asyncHandler(userRouter));
  app.use(jwtMiddleware);
  app.use(`${BASE}/${BasePoints.ROOM}`, asyncHandler(roomRouter));
  app.use(`${BASE}/${BasePoints.FOOD}`, asyncHandler(foodRouter));
  app.use(`${BASE}/${BasePoints.ORDER}`, asyncHandler(orderRouter));
}
