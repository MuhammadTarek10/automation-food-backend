const express = require("express");
const { StatusCodes } = require("../constants/status_codes");
const { Session, validate, validateSearch } = require("../models/session");
const auth = require("../middlewares/auth");
const { SessionRoutesStrings } = require("../constants/strings");
const router = express.Router();

router.post(SessionRoutesStrings.CREATE_SESSION, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let session = new Session({
    user_id: req.user._id,
    name: req.body.name,
    code: req.body.code,
    number: req.body.number,
  });

  await session.save();

  res.status(StatusCodes.CREATED).send(session._id);
});

router.get(SessionRoutesStrings.GET_SESSIONS, async (req, res) => {
  const sessions = await Session.find().sort("name");
  res.send(sessions);
});

router.post(SessionRoutesStrings.SEARCH_SESSION, auth, async (req, res) => {
  const { error } = validateSearch(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  const session = await Session.findOne({ code: req.body.code });
  res.status(StatusCodes.OK).send(session._id);
});

router.delete(SessionRoutesStrings.DELETE_SESSION, auth, async (req, res) => {
  const session = await Session.find({
    _id: req.body._id,
    user_id: req.user._id,
  });
  if (!session)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));
  res.status(StatusCodes.OK).send(session);
});

module.exports = router;
