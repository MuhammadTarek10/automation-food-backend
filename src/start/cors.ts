import cors from "cors";
import { Express } from "express";
export default function (app: Express): void {
  app.use(cors());
}
