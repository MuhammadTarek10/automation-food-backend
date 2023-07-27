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
import { PostgresDatasource } from "../data/dbs/postgres";

class UserController {
  private db: Datasource;

  constructor(db: Datasource) {
    this.db = db;
  }

  public login: ExpressHandler<LoginRequest, LoginResponse> = async (
    req,
    res
  ) => {};

  public register: ExpressHandler<RegisterRequest, RegisterResponse> = async (
    req,
    res
  ) => {};

  public logout: ExpressHandler<LogoutRequest, LogoutResponse> = async (
    req,
    res
  ) => {};

  public getAllUsers: ExpressHandler<GetAllUsersRequest, GetAllUsersResponse> =
    async (req, res) => {
      const users = await this.db.getAllUsers();
      return res.status(200).json({
        users: users,
      });
    };
}

export const controller = new UserController(new PostgresDatasource());
