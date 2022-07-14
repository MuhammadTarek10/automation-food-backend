const express = require("express");
const http = require("http");
const io = require("socket.io")(http);
const { getStatusMessage } = require("./constants/functions");
const { StatusCodes } = require("./constants/status_codes");


const app = express();
const { PORT } = require("./start/config");

require("./start/db")();
require("./start/routes")(app);

const server = app.listen(PORT, (err) =>
  console.log(`Listening on port ${PORT}`)
);

app.get("/", (req, res) => {
  res
    .status(StatusCodes.GATEWAY_TIMEOUT)
    .send(getStatusMessage(StatusCodes.GATEWAY_TIMEOUT));
});

module.exports = server;
