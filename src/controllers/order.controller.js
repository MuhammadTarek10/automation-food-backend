import connection from "../database/connection.js";
import queries from "../database/queries.js";
import { StatusCodes } from "../config/constants/status_codes.js";
import { Order } from "../models/order.model.js";
import { StatusCodeStrings } from "../config/constants/strings.js";
import { LoggerService } from "../services/logger.service.js";
import { Validator } from "../utils/validator.js";

class OrderController {
  constructor() {
    this.logger = new LoggerService("order.controller");
    this.getAllOrders = this.getAllOrders.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.getMyOrders = this.getMyOrders.bind(this);
    this.getOrdersByRoom = this.getOrdersByRoom.bind(this);
  }

  async getAllOrders(req, res) {
    try {
      const { rows } = await connection(queries.GET_ALL_ORDERS);
      res.json(rows);
      this.logger.info("Get All Orders");
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async addOrder(req, res) {
    try {
      const result = await connection(queries.GET_USER_BY_EMAIL, [
        req.user.email,
      ]);
      if (!result.rows[0])
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(StatusCodeStrings.USER_NOT_FOUND);

      const user_id = result.rows[0].id;
      const { room_id, food_id } = req.body;
      const validator = new Validator();
      const order = new Order(room_id, user_id, order);
      if (!validator.isValidOrder(order))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.INVALID_ORDER);

      const order_id = await connection(queries.ADD_ORDER, [
        order.room_id,
        order.user_id,
      ]);

      await connection(queries.ADD_ORDERS_FOOD, [order_id.rows[0].id, food_id]);
      this.logger.info("Add Order");
      res.status(StatusCodes.CREATED).json(order);
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async getMyOrders(req, res) {
    try {
      const result = await connection(queries.GET_USER_BY_EMAIL, [
        req.user.email,
      ]);
      if (!result.rows[0])
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(StatusCodeStrings.USER_NOT_FOUND);

      const user_id = result.rows[0].id;
      const { rows } = await connection(queries.GET_ORDERS_BY_USER, [user_id]);
      res.json(rows);
      this.logger.info("Get My Orders");
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }
}

export const controller = new OrderController();
