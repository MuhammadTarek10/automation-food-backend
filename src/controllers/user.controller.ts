import {
  GetAllUsersRequest,
  GetAllUsersResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from "../apis/user.apis";
import { ExpressHandler } from "../config/types/types";
import { Datasource } from "../data/dao/datasource.dao";
import PostgresDatasource from "../data/dbs/postgres";

import { generateAuthToken } from "../middlewares/auth";
import { LoggerService } from "../services/logger.service";

class UserController {
  private db: Datasource;
  private logger: LoggerService;

  constructor(db: Datasource) {
    this.logger = new LoggerService("user.controller");
    this.db = db;
  }

  public login: ExpressHandler<LoginRequest, LoginResponse> = async (
    req,
    res
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      this.logger.error("Email and Password required");
      return res.status(400).json({
        error: "Email and Password required",
      });
    }
    const user = await this.db.getUserByEmail(email);
    if (!user) {
      this.logger.error("Invalid username or password");
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateAuthToken(user.id),
    });
  };

  public register: ExpressHandler<RegisterRequest, RegisterResponse> = async (
    req,
    res
  ) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, Email and Password Required",
      });
    }
    const user = await this.db.getUserByEmail(email);
    if (user) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }
    const id = await this.db.createUser(name, email, password);
    return res.status(201).json({
      token: generateAuthToken(id),
    });
  };

  public logout: ExpressHandler<LogoutRequest, LogoutResponse> = async (
    req,
    res
  ) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Email Required",
      });
    }
    const user = await this.db.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid email",
      });
    }
    return res.sendStatus(200);
  };

  public getAllUsers: ExpressHandler<GetAllUsersRequest, GetAllUsersResponse> =
    async (req, res) => {
      const users = await this.db.getAllUsers();
      return res.status(200).json({
        users: users,
      });
    };
}

export const controller = new UserController(new PostgresDatasource());
