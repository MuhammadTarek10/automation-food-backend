const express = require("express");
const auth = require("../middlewares/auth");
const { Order, validate } = require("../models/order");
const { OrderRoutesStrings } = require("../constants/strings");
const { StatusCodes } = require("../constants/status_codes");
const { getStatusMessage } = require("../constants/functions");
const { User } = require("../models/user");

const router = express.Router();

router.post(OrderRoutesStrings.ADD_ORDER, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  let order = new Order({
    user_id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    room_id: req.body.room_id,
  });

  await order.save();
  res.status(StatusCodes.CREATED).send({ order: order });
});

router.get(OrderRoutesStrings.GET_ORDERS, async (req, res) => {
  const orders = await Order.find({ room_id: req.params.room_id });
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

router.put(OrderRoutesStrings.EDIT_ORDER, async (req, res) => {
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

router.delete(OrderRoutesStrings.DELETE_ORDER, async (req, res) => {
  const order = await Order.find({ _id: req.body._id, user_id: req.params.id });
  if (!order)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  await order.delete();
  res.status(StatusCodes.OK).send(order);
});

module.exports = router;
