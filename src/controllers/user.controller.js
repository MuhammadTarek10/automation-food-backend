import connection from "../database/connection.js";
import queries from "../database/queries.js";
import { StatusCodes } from "../config/constants/status_codes.js";
import { User } from "../models/user.model.js";
import { StatusCodeStrings } from "../config/constants/strings.js";
import { LoggerService } from "../services/logger.service.js";
import { Validator } from "../utils/validator.js";

class UserController {
  constructor() {
    this.logger = new LoggerService("user.controller");
    this.getAllUsers = this.getAllUsers.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async getAllUsers(req, res) {
    try {
      const { rows } = await connection(queries.GET_USERS);
      res.json(rows);
      this.logger.info("Get All Users");
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const result = await connection(queries.GET_USER_BY_EMAIL, [email]);
      if (result.rows[0])
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.USER_ALREADY_EXISTS);

      const validator = new Validator();
      const user = new User(name, email, password);
      if (!validator.isValidUser(user))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.INVALID_USER);

      const token = user.generateAuthToken();
      await connection(queries.CREATE_USER, [
        user.name,
        user.email,
        user.password,
      ]);
      this.logger.info("Register User");
      res.status(StatusCodes.CREATED).json({
        user: {
          name,
          email,
        },
        token: token,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async login(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const result = await connection(queries.GET_USER, [email, password]);
      if (!result.rows[0])
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.USER_NOT_FOUND);

      const user = new User(
        result.rows[0].name,
        result.rows[0].email,
        result.rows[0].password
      );

      const token = user.generateAuthToken();
      this.logger.info("Login User");
      res.status(StatusCodes.OK).json({
        user: user,
        token: token,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }
}

export const controller = new UserController();
