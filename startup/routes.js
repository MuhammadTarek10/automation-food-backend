const express = require("express");
const { RoutesStrings } = require("../constants/strings");
const order = require("../routes/order");


module.exports = function(app){
    app.use(express.json());
    app.use(RoutesStrings.ORDER, order);
}