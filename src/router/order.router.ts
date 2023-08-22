import express from "express";
import { Endpoints } from "../config/api/endpoints";
import { controller } from "../controllers/order.controller";
const router = express.Router();

router.post(Endpoints.ORDER.ADD_ORDER, controller.createOrder);
router.get(Endpoints.ORDER.GET_ORDER_BY_ID, controller.getOrderById);
router.delete(Endpoints.ORDER.DELETE_ORDER, controller.deleteOrder);

export default router;
