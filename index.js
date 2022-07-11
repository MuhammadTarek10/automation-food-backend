const express = require("express");
const app = express();
const { PORT } = require("./startup/config");


require("./startup/db")();



const server = app.listen(PORT, (err) => 
    console.log(`Listening on port ${PORT}`));

module.exports = server;

