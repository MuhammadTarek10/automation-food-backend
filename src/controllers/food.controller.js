import connection from "../database/connection.js";
import queries from "../database/queries.js";
import { StatusCodes } from "../config/constants/status_codes.js";
import { Food } from "../models/food.model.js";
import { StatusCodeStrings } from "../config/constants/strings.js";
import { LoggerService } from "../services/logger.service.js";
import { Validator } from "../utils/validator.js";

class FoodController {
  constructor() {
    this.logger = new LoggerService("food.controller");
    this.getAllFood = this.getAllFood.bind(this);
    this.addFood = this.addFood.bind(this);
    this.addFoodToRoom = this.addFoodToRoom.bind(this);
    this.getFoodByUserId = this.getFoodByUserId.bind(this);
    this.getFoodByRoomId = this.getFoodByRoomId.bind(this);
  }

  async getAllFood(req, res) {
    try {
      const result = await connection(queries.GET_ALL_FOOD);
      this.logger.info("Get Food");
      return res.status(StatusCodes.OK).json(result.rows);
    } catch (err) {
      this.logger.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: StatusCodeStrings.INTERNAL_SERVER_ERROR,
      });
    }
  }
  async addFood(req, res) {
    try {
      const result = await connection(queries.GET_USER_BY_EMAIL, [
        req.user.email,
      ]);
      if (!result.rows[0])
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(StatusCodeStrings.USER_NOT_FOUND);

      const user_id = result.rows[0].id;
      const { name, price, restaurant, category_id } = req.body;
      const validator = new Validator();
      const food = new Food(name, price, restaurant, user_id, category_id);
      if (!validator.isValidFood(food))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.INVALID_FOOD);

      await connection(queries.ADD_FOOD, [
        food.name,
        food.price,
        food.restaurant,
        food.category_id,
        food.user_id,
      ]);
      this.logger.info("Add Food");
      return res.status(StatusCodes.CREATED).json(food);
    } catch (err) {
      this.logger.error(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(StatusCodeStrings.INTERNAL_SERVER_ERROR);
    }
  }
  async getFoodByUserId(req, res) {
    try {
      const user_id = req.params.id;
      const foodResult = await connection(queries.GET_FOOD_BY_USER_ID, [
        user_id,
      ]);
      this.logger.info("Get Food By User Id");
      return res.status(StatusCodes.OK).json(foodResult.rows);
    } catch (err) {
      this.logger.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: StatusCodeStrings.INTERNAL_SERVER_ERROR,
      });
    }
  }
  async getFoodByRoomId(req, res) {
    try {
      const room_id = req.params.id;
      const foodResult = await connection(queries.GET_FOOD_BY_ROOM_ID, [
        room_id,
      ]);
      this.logger.info("Get Food By Room Id");
      return res.status(StatusCodes.OK).json(foodResult.rows);
    } catch (err) {
      this.logger.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: StatusCodeStrings.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async addFoodToRoom(req, res) {
    try {
      const user_id = req.user.id;
      const { room_id, food_id } = req.body;
      const result = await connection(queries.GET_FOOD_BY_ROOM_ID, [
        room_id,
        food_id,
      ]);

      if (result.rows[0])
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.FOOD_ALREADY_IN_ROOM);

      const foodResult = await connection(queries.ADD_FOOD_TO_ROOM, [
        food_id,
        room_id,
        user_id,
      ]);
      this.logger.info("Add Food To Room");
      return res.status(StatusCodes.OK).json(foodResult.rows);
    } catch (err) {
      this.logger.error(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(StatusCodeStrings.INTERNAL_SERVER_ERROR);
    }
  }
}

export const controller = new FoodController();
