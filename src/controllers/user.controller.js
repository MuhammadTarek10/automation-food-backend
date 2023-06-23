import connection from "../database/connection.js";
import queries from "../database/queries.js";
import { StatusCodes } from "../config/constants/status_codes.js";
import { User } from "../models/user.model.js";
import { StatusCodeStrings } from "../config/constants/strings.js";
import { LoggerService } from "../services/logger.service.js";
import { Validator } from "../utils/validator.js";
import { generator } from "../utils/generator.js";

class UserController {
  constructor() {
    this.logger = new LoggerService("user.controller");
    this.getAllUsers = this.getAllUsers.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getAllUsers(req, res) {
    try {
      const { rows } = await connection(queries.GET_USERS);
      console.log(rows);
      res.json(rows);
      this.logger.info("Get All Users");
    } catch (err) {
      this.logger.err(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const validator = new Validator();
      const user = new User(name, email, password);
      if (!validator.isValidUser(user))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.INVALID_USER);

      const values = [name, email, password];
      await connection(queries.CREATE_USER, values);
      res.status(StatusCodes.CREATED).json(user);
      this.logger.info("Create User");
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }
}

export const controller = new UserController();
