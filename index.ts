import express from "express";
import { StatusCodes } from "./src/config/constants/status_codes";
import routes from "./src/start/routes";
import { config } from "dotenv";
import { StatusCodeStrings } from "./src/config/constants/strings";
import startSocket from "./src/socket/server.socket";
config();

const PORT = process.env.PORT || 3000;

const app = express();

routes(app);

const server = startSocket(app);

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send(StatusCodeStrings.OK);
});

export default server;
