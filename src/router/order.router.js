import express from "express";
import { Endpoints } from "../config/api/endpoints.js";
import { controller } from "../controllers/order.controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get(Endpoints.ORDER.GET_ALL_ORDERS, controller.getAllOrders);
router.get(Endpoints.ORDER.GET_MY_ORDERS, controller.getMyOrders);
router.get(Endpoints.ORDER.GET_ORDER_BY_ROOM, controller.getOrdersByRoom);
router.post(Endpoints.ORDER.ADD_ORDER, auth, controller.addOrder);

export default router;
