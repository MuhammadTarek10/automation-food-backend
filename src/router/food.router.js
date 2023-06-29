import express from "express";
import { Endpoints } from "../config/api/endpoints.js";
import { controller } from "../controllers/food.controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get(Endpoints.FOOD.GET_ALL_FOOD, controller.getAllFood);
router.get(Endpoints.FOOD.GET_FOOD_BY_USER, controller.getFoodByUserId);
router.get(Endpoints.FOOD.GET_FOOD_BY_ROOM, controller.getFoodByRoomId);
router.post(Endpoints.FOOD.ADD_FOOD, auth, controller.addFood);
router.post(Endpoints.FOOD.ADD_FOOD_TO_ROOM, auth, controller.addFoodToRoom);

export default router;
