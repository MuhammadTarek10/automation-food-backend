import { serve, setup } from "swagger-ui-express";
import { Swagger } from "../config/api/endpoints.js";
import swaggerDocument from "./swagger.json" assert { type: "json" };

export default function (app, base) {
  app.use(`${base}/${Swagger.DOCS}`, serve, setup(swaggerDocument));
}
