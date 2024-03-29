const express = require("express");
const { StatusCodes } = require("../constants/status_codes");
const { RoomRoutesStrings } = require("../constants/strings");
const { Room, validate, validateSearch } = require("../models/room");
const { getStatusMessage } = require("../constants/functions");
const { User } = require("../models/user");
const { default: mongoose } = require("mongoose");
const { Order } = require("../models/order");
const { DB_URL } = require("../start/config");

const router = express.Router();

router.post(RoomRoutesStrings.CREATE_ROOM, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  if (!(await Room.findOne({ code: req.body.code }))) {
    const user = await User.findById(req.params.id);
    let room = new Room({
      name: req.body.name,
      code: req.body.code,
      admin_id: req.params.id,
      admin: user,
      number: req.body.number,
    });
    user.rooms.push(room._id);

    const database = await mongoose.createConnection(DB_URL).asPromise();
    const transaction = await database.startSession();
    transaction.startTransaction();
    try {
      await room.save();
      await user.save();
      await transaction.commitTransaction();
      transaction.endSession();
      return res.status(StatusCodes.CREATED).send(room);
    } catch (error) {
      await transaction.abortTransaction();
      transaction.endSession();
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    } finally {
      database.close();
    }
  }

  res.status(StatusCodes.CONFLICT).send(getStatusMessage(StatusCodes.CONFLICT));
});

router.get(RoomRoutesStrings.GET_ROOMS, async (req, res) => {
  var rooms = [];
  var isAdmin = false;
  const adminRooms = await Room.find({ admin_id: req.params.id }).sort("name");
  if (adminRooms.length > 0) {
    rooms.push(...adminRooms);
    isAdmin = true;
  }
  const user = await User.findById(req.params.id);
  if (!isAdmin) {
    try {
      for (let i = 0; i < user.rooms.length; i++) {
        const room = await Room.findById(user.rooms[i]);
        rooms.push(room);
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  if (!rooms.includes(null)) {
    res.status(StatusCodes.OK).send(rooms);
  } else {
    res.status(StatusCodes.OK).send([]);
  }
});

router.post(RoomRoutesStrings.JOIN_ROOM, async (req, res) => {
  const { error } = validateSearch(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const room = await Room.findOne({ code: req.body.code });

  if (room) {
    const user = await User.findById(req.params.id);
    if (!user.rooms.includes(room._id)) {
      user.rooms.push(room._id);
      room.users.push(user);
      const database = await mongoose.createConnection(DB_URL).asPromise();
      const transaction = await database.startSession();
      transaction.startTransaction();
      try {
        await user.save();
        await room.save();
        await transaction.commitTransaction();
        transaction.endSession();
        return res.status(StatusCodes.OK).send(room);
      } catch (error) {
        await transaction.abortTransaction();
        transaction.endSession();
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(getStatusMessage(StatusCodes.INTERNAL_SERVER_ERROR));
      } finally {
        await database.close();
      }
    }
    res.status(StatusCodes.OK).send(room);
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));
  }
});

router.get(RoomRoutesStrings.GET_ROOM, async (req, res) => {
  const room = await Room.findById(req.params.room_id);
  if (room) {
    res.status(StatusCodes.OK).send(room);
  } else {
    res

      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));
  }
});

router.delete(RoomRoutesStrings.DELETE_ROOM, async (req, res) => {
  const room = await Room.findOne({
    admin_id: req.params.id,
    room_id: req.params.room_id,
  });
  if (!room)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  const index = user.rooms.indexOf(room._id);
  if (index > -1) {
    user.rooms.splice(index, 1);
  }

  const orders = await Order.find({ room_id: req.params.room_id });

  const database = await mongoose.createConnection(DB_URL).asPromise();
  const transaction = await database.startSession();
  transaction.startTransaction();
  try {
    await room.remove();
    await user.save();
    for (let i = 0; i < orders.length; i++) {
      await Order.findByIdAndDelete(orders[i]._id);
    }
    await transaction.commitTransaction();
    transaction.endSession();
    return res.status(StatusCodes.OK).send(getStatusMessage(StatusCodes.OK));
  } catch (error) {
    await transaction.abortTransaction();
    transaction.endSession();
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getStatusMessage(StatusCodes.INTERNAL_SERVER_ERROR));
  } finally {
    await database.close();
  }
});

module.exports = router;
