const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Order, validate } = require("../models/order");
const { OrderRoutesStrings } = require("../constants/strings");
const { StatusCodes } = require("../constants/status_codes");
const { getStatusMessage } = require("../constants/functions");
const { DB_URL } = require("../start/config");
const { User } = require("../models/user");
const { Room } = require("../models/room");

const router = express.Router();

router.post(OrderRoutesStrings.ADD_ORDER, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  let order = new Order({
    user_id: user._id,
    name: req.body.name,
    price: req.body.price,
    room_id: req.body.room_id,
  });

  const room = await Room.findById(req.body.room_id);
  if (!room.users.includes(user._id)) room.users.push(user._id);
  room.orders.push(order._id);

  const database = await mongoose.createConnection(DB_URL).asPromise();
  const transaction = await database.startSession();
  transaction.startTransaction();
  try {
    await order.save({ session: transaction });
    await room.save({ session: transaction });
    await transaction.commitTransaction();
    return res.status(StatusCodes.CREATED).send(room);
  } catch (error) {
    await transaction.abortTransaction();
    res.status(StatusCodes.BAD_REQUEST).send(error);
  } finally {
    database.close();
  }
});

router.get(OrderRoutesStrings.GET_ORDERS, auth, async (req, res) => {
  const orders = await Order.find({ room_id: req.body.room_id }).select(
    "-done -__v -room_id"
  );
  const users = await User.find({}).select("-password -isAdmin -__v");
  const usersMap = users.reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {});
  const mappedOrders = orders.map((order) => {
    const user = usersMap[order.user_id];
    return { ...order._doc, user };
  }, {});
  res.status(StatusCodes.OK).send(mappedOrders);
});

router.put(OrderRoutesStrings.EDIT_ORDER, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const order = await Order.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      price: req.body.price,
    },
    { new: true }
  );
  if (!order)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).send(order);
});

router.delete(OrderRoutesStrings.DELETE_ORDER, auth, async (req, res) => {
  const order = await Order.find({ _id: req.body._id, user_id: req.user._id });
  if (!order)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  await order.delete();
  res.status(StatusCodes.OK).send(order);
});

module.exports = router;
