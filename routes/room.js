const express = require("express");
const auth = require("../middlewares/auth");
const { StatusCodes } = require("../constants/status_codes");
const { RoomRoutesStrings } = require("../constants/strings");
const { Room, validate, validateSearch } = require("../models/room");
const { getStatusMessage } = require("../constants/functions");
const { User } = require("../models/user");

const router = express.Router();

router.post(RoomRoutesStrings.CREATE_ROOM, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let room = new Room({
    name: req.body.name,
    code: req.body.code,
    admin_id: req.user._id,
    number: req.body.number,
  });

  await room.save();

  res.status(StatusCodes.CREATED).send(room);
});

router.get(RoomRoutesStrings.GET_ROOMS, auth, async (req, res) => {
  const rooms = await Room.find({ admin_id: req.user._id }).sort("name");
  res.status(StatusCodes.OK).send(rooms);
});

router.post(RoomRoutesStrings.SEARCH_ROOM, auth, async (req, res) => {
  const { error } = validateSearch(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findById(req.user._id).select(
    "-password -isAdmin -__v"
  );
  const room = await Room.findOne({ code: req.body.code });
  if (room) {
    if (!room.users.includes(user._id)) room.users.push(user._id);
    await room.save();
    res.status(StatusCodes.OK).send(room);
  } else {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));
  }
});

router.delete(RoomRoutesStrings.DELETE_ROOM, auth, async (req, res) => {
  const room = await Room.findByIdAndDelete(req.body.room_id);
  if (!room)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).send(room);
});

module.exports = router;
