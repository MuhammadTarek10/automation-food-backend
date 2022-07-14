const express = require("express");
const auth = require("../middlewares/auth");
const { StatusCodes } = require("../constants/status_codes");
const { Order, validate } = require("../models/order");
const { User } = require("../models/user");
const { getStatusMessage } = require("../constants/functions");
const { OrderRoutesStrings } = require("../constants/strings");

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
    user_id: req.user._id,
    name: req.body.name,
    price: req.body.price,
    session_id: req.body.session_id,
  });

  order = await order.save();
  res.status(StatusCodes.CREATED).send(order);
});

router.get(OrderRoutesStrings.GET_ORDERS, auth, async (req, res) => {
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
  
  const order = await Order.find({ _id: req.body._id , user_id: req.user._id });
  if (!order)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(getStatusMessage(StatusCodes.NOT_FOUND));

  await order.delete()
  res.status(StatusCodes.OK).send(order);
});

module.exports = router;
