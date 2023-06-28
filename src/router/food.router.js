import express from "express";
import { Endpoints } from "../config/api/endpoints.js";
import { controller } from "../controllers/food.controller.js";
const router = express.Router();

router.get(Endpoints.FOOD.GET_ALL_FOOD, controller.getAllFood);
router.post(Endpoints.FOOD.ADD_FOOD, controller.addFood);
router.get(Endpoints.FOOD.GET_FOOD_BY_USER, controller.getFoodByUserId);
router.get(Endpoints.FOOD.GET_FOOD_BY_ROOM, controller.getFoodByRoomId);

export default router;
