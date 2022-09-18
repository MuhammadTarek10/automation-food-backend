const bcrypt = require("bcrypt");
const express = require("express");
const joi = require("joi");

const { getStatusMessage } = require("../constants/functions");

const { StatusCodes } = require("../constants/status_codes");
const { HeaderStrings, AuthRoutesSettings } = require("../constants/strings");
const { User } = require("../models/user");
const router = express.Router();

router.post(AuthRoutesSettings.LOGIN, async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));

  const token = user.generateAuthToken();
  const { password, ...responseUser } = user._doc;
  res.status(StatusCodes.OK).send({ token: token, user: responseUser });
});

router.post(AuthRoutesSettings.REGISTER, async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(StatusCodes.CONFLICT)
      .send(getStatusMessage(StatusCodes.CONFLICT));

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .status(StatusCodes.CREATED)
    .header(HeaderStrings.AUTHORIZATION, token)
    .send(user);
});

function validateLogin(user) {
  const schema = joi.object({
    email: joi.string().email().required().email(),
    password: joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

function validateRegister(user) {
  const schema = joi.object({
    name: joi.string().min(2).max(255).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports = router;
