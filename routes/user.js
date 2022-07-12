const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { StatusCodes } = require("../constants/status_codes");
const express = require("express");
const { User } = require("../models/user");
const { getStatusMessage } = require("../constants/functions");
const { UserRoutesStrings } = require("../constants/strings");
const router = express.Router();

router.get(UserRoutesStrings.GET_USERS, [auth, admin], async (req, res) => {
  const users = await User.find().select("-password");
  res.status(StatusCodes.OK).send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(StatusCodes.NOT_FOUND).send(getStatusMessage(StatusCodes.NOT_FOUND));
  res.send(user);
});

module.exports = router;
