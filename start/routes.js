const express = require("express");
const { RoutesStrings } = require("../constants/strings");
const user = require("../routes/user");
const auth = require("../routes/auth");
const order = require("../routes/order");
const room = require("../routes/room");

module.exports = function (app) {
  app.use(express.json());
  app.use(RoutesStrings.ORDER, order);
  app.use(RoutesStrings.AUTH, auth);
  app.use(RoutesStrings.USER, user);
  app.use(RoutesStrings.ROOM, room);
};
