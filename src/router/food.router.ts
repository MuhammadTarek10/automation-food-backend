import express from "express";
import { Endpoints } from "../config/api/endpoints";
import { controller } from "../controllers/food.controller";
const router = express.Router();

// * Food Category
router.get(Endpoints.FOOD.GET_CATEGORY, controller.getFoodByCategoryId);
router.get(Endpoints.FOOD.CATEGORY, controller.getCategoryByUserId);
router.post(Endpoints.FOOD.CATEGORY, controller.createCategory);
router.put(Endpoints.FOOD.CATEGORY, controller.updateCategory);
router.delete(Endpoints.FOOD.CATEGORY, controller.deleteCategory);

// * Food
router.get(Endpoints.FOOD.FOOD, controller.getFoodByUserId);
router.post(Endpoints.FOOD.FOOD, controller.createFood);
router.put(Endpoints.FOOD.FOOD, controller.updateFood);
router.delete(Endpoints.FOOD.FOOD, controller.deleteFood);
router.get(Endpoints.FOOD.GET_FOOD_BY_ROOM, controller.getFoodByRoomId);
router.get(Endpoints.FOOD.GET_FOOD_BY_CATEGORY, controller.getFoodByCategoryId);
router.post(Endpoints.FOOD.ADD_FOOD_TO_ROOM, controller.addFoodToRoom);

export default router;
