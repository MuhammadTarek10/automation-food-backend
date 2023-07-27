import pkg from "body-parser";
import { Express } from "express";
const { json, urlencoded } = pkg;

export default function (app: Express): void {
  app.use(json());
  app.use(urlencoded({ extended: false }));
}
