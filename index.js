import express from "express";
import { StatusCodes } from "./src/config/constants/status_codes.js";
import routes from "./src/start/routes.js";
import { config } from "dotenv";
import { StatusCodeStrings } from "./src/config/constants/strings.js";
config();

const PORT = process.env.PORT || 3000;

const app = express();
routes(app);

const server = app.listen(PORT, (err) =>
  console.log(`Listening on port ${PORT}`)
);

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send(StatusCodeStrings.OK);
});

export default server;
