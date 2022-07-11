const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { StatusCodes } = require("../constants/status_codes");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/grab", [auth, admin], async (req, res) => {
  const users = await User.find().select("-password");
  res.status(StatusCodes.OK).send(users);
});

module.exports = router;
