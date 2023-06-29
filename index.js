import express from "express";
import { StatusCodes } from "./src/config/constants/status_codes.js";
import routes from "./src/start/routes.js";
import { config } from "dotenv";
import { StatusCodeStrings } from "./src/config/constants/strings.js";
import startSocket from "./src/socket/server.socket.js";
config();

const PORT = process.env.PORT || 3000;

const app = express();
routes(app);

const server = startSocket(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send(StatusCodeStrings.OK);
});

export default server;
