import { Express } from "express";
import { serve, setup } from "swagger-ui-express";
import { App, Swagger } from "../config/api/endpoints";
import swaggerDocument from "./swagger.json";

export default function (app: Express): void {
  app.use(`${App.BASE}/${Swagger.DOCS}`, serve, setup(swaggerDocument));
}
