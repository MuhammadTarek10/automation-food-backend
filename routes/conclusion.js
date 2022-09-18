const express = require("express");
const { ConclusionRoutesStrings } = require("../constants/strings");
const auth = require("../middlewares/auth");
const Conclusion = require("../models/conclusion");
const { Order } = require("../models/order");
const router = express.Router();

router.get(ConclusionRoutesStrings.GET_CONCLUSION, auth, async (req, res) => {
  const orders = await Order.find({ room_id: req.query.room_id });
  const total = orders.reduce((acc, order) => acc + order.price, 0);
  const conclusion = Conclusion({
    user_id: req.user._id,
    total: total,
    orders: orders,
  });
  res.send(conclusion);
});

module.exports = router;
