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
      const { name, price, restaurant } = req.body;
      const validator = new Validator();
      const food = new Food(name, price, restaurant);
      if (!validator.isValidFood(food)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: StatusCodeStrings.INVALID_FOOD,
        });
      }
      await connection(queries.ADD_FOOD, [
        food.name,
        food.price,
        food.restaurant,
      ]);
      this.logger.info("Add Food");
      return res.status(StatusCodes.CREATED).json(food);
    } catch (err) {
      this.logger.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: StatusCodeStrings.INTERNAL_SERVER_ERROR,
      });
    }
  }
  async getFoodByUserId(req, res) {}
  async getFoodByRoomId(req, res) {}
}

export const controller = new FoodController();
