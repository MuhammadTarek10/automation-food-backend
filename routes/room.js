const express = require("express");
const auth = require("../middlewares/auth");
const { StatusCodes } = require("../constants/status_codes");
const { RoomRoutesStrings } = require("../constants/strings");
const { Room, validate, validateSearch } = require("../models/room");
const { getStatusMessage } = require("../constants/functions");
const { User } = require("../models/user");

const router = express.Router();

router.post(RoomRoutesStrings.CREATE_ROOM, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  if (!(await Room.findOne({ code: req.body.code }))) {
    let room = new Room({
      name: req.body.name,
      code: req.body.code,
      admin_id: req.query.id,
      number: req.body.number,
    });

    await room.save();
    return res.status(StatusCodes.CREATED).send(room);
  }

  res.status(StatusCodes.CONFLICT).send(getStatusMessage(StatusCodes.CONFLICT));
});

router.get(RoomRoutesStrings.GET_ROOMS, async (req, res) => {
  const rooms = await Room.find({ admin_id: req.query.id }).sort("name");
  res.status(StatusCodes.OK).send(rooms);
});

router.post(RoomRoutesStrings.SEARCH_ROOM, async (req, res) => {
  const { error } = validateSearch(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findById(req.query.id).select(
    "-password -isAdmin -__v"
  );
  const room = await Room.findOne({ code: req.body.code });
  if (room) {
    res.status(StatusCodes.OK).send(room);
  } else {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));
  }
});

router.delete(RoomRoutesStrings.DELETE_ROOM, async (req, res) => {
  const room = await Room.findOneAndDelete({
    room_id: req.body.room_id,
    admin_id: req.query.id,
  });
  if (!room)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));

  res.status(StatusCodes.OK).send(getStatusMessage(StatusCodes.OK));
});

module.exports = router;
