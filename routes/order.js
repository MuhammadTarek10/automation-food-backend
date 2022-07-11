const express = require("express");
const { Order, validate } = require("../models/order");
const router = express.Router();


router.get("/", async (req, res) => {
    const orders = await Order.find().sort("name");
    res.send(orders);
});


module.exports = router;