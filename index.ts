import { config } from "dotenv";
import express from "express";
import { StatusCodes } from "./src/config/constants/status_codes";
import { StatusCodeStrings } from "./src/config/constants/strings";
import { initDB } from "./src/data/dao/datasource.dao";
import startSocket from "./src/socket/server.socket";
import routes from "./src/start/routes";
config();

(async () => {
  const PORT = process.env.PORT || 3000;

  const app = express();

  await initDB();
  routes(app);

  const server = startSocket(app);

  server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });

  app.get("/", (req, res) => {
    res.status(StatusCodes.OK).send(StatusCodeStrings.OK);
  });
})();
