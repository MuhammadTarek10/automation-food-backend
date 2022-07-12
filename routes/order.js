const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { StatusCodes } = require("../constants/status_codes");
const { Order, validate } = require("../models/order");
const { Session } = require("../models/session");
const { User } = require("../models/user");
const { getStatusMessage } = require("../constants/functions");
const { DB_URL } = require("../start/config");
const { OrderRoutesStrings } = require("../constants/strings");

const router = express.Router();

router.post(OrderRoutesStrings.ADD_ORDER, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const session = await Session.findById(req.body.session_id);
  if (!session)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  let order = new Order({
    user_id: req.user._id,
    name: req.body.name,
    price: req.body.price,
    session_id: req.body.session_id,
  });
  session.orders.push(order);

  const database = await mongoose.createConnection(DB_URL).asPromise();
  const transaction = await database.startSession();
  transaction.startTransaction();
  try {
    await order.save({ session: transaction });
    await session.save({ session: transaction });
    await transaction.commitTransaction();
    return res.status(StatusCodes.CREATED).send(session);
  } catch (err) {
    await transaction.abortTransaction();
    return res.status(StatusCodes.BAD_REQUEST).send(err);
  } finally {
    database.close();
  }
});

router.get(OrderRoutesStrings.GET_ORDERS, async (req, res) => {
  const orders = await Order.find({ session_id: req.body.session_id });
  const users = await User.find({});
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

module.exports = router;
