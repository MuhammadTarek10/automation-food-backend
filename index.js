const express = require("express");
const app = express();
const { PORT, HOST } = require("./startup/config");

require("./startup/db")();



const server = app.listen(PORT, HOST, (err) => 
    console.log(`Listening on host: ${HOST}\nListening on port ${PORT}`));

module.exports = server;

