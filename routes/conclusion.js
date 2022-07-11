const express = require("express");
const auth = require("../middlewares/auth");
const { Conclusion } = require("../models/conclusion");
const { Order } = require("../models/order");
const router = express.Router();

router.get("/all", auth, async (req, res) => {
  const orders = await Order.find().sort("price");
  const total = orders.reduce((acc, order) => acc + order.price, 0);
  const conclusion = Conclusion({
    user_id: req.user._id,
    total: total,
    orders: orders,
  });
  res.send(conclusion);
});

module.exports = router;
