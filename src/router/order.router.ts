import express from "express";
import { Endpoints } from "../config/api/endpoints";
import { controller } from "../controllers/order.controller";
const router = express.Router();

router.post(Endpoints.ORDER.ADD_ORDER, controller.createOrder);

export default router;
