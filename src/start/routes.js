import { App, BasePoints } from "../config/api/endpoints.js";
import cors from "./cors.js";
import parser from "./parser.js";
import swagger from "./swagger.js";
import userRouter from "../router/user.router.js";
import foodRouter from "../router/food.router.js";

const BASE = `/${App.BASE}/${App.VERSION}`;

export default function (app) {
  cors(app);
  parser(app);
  swagger(app, BASE);
  app.use(`${BASE}/${BasePoints.USER}`, userRouter);
  app.use(`${BASE}/${BasePoints.FOOD}`, foodRouter);
}
