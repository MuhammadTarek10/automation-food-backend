const express = require("express");
const { getStatusMessage } = require("./src/config/constants/functions");
const { StatusCodes } = require("./src/config/constants/status_codes");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

require("./src/start/routes")(app);

const server = app.listen(PORT, (err) =>
  console.log(`Listening on port ${PORT}`)
);

app.get("/", (req, res) => {
  res
    .status(StatusCodes.GATEWAY_TIMEOUT)
    .send(getStatusMessage(StatusCodes.GATEWAY_TIMEOUT));
});

module.exports = server;
