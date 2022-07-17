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

  res.status(StatusCodes.CREATED).send(session);
});

router.get(SessionRoutesStrings.GET_SESSIONS, auth, async (req, res) => {
  const sessions = await Session.find({ user_id: req.user._id }).sort("name");
  res.status(StatusCodes.OK).send(sessions);
});

router.post(SessionRoutesStrings.SEARCH_SESSION, auth, async (req, res) => {
  const { error } = validateSearch(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  const session = await Session.findOne({ code: req.body.code });
  res.status(StatusCodes.OK).send(session);
});

router.delete(SessionRoutesStrings.DELETE_SESSION, auth, async (req, res) => {
  const session = await Session.findByIdAndDelete(req.body.session_id);
  if (!session)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).send(session);
});

module.exports = router;
