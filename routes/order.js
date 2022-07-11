const express = require("express");
const { StatusCodes } = require("../constants/status_codes");
const { Order, validate } = require("../models/order");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find().sort("price");
  res.send(orders);
});

router.post("/add-order", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let order = new Order({
    user_id: req.user._id,
    name: req.body.name,
    price: req.body.price,
  });

  await order.save();

  res.status(StatusCodes.CREATED).send(order);
});

module.exports = router;
