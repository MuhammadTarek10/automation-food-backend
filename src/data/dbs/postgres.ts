import { PostgresDataType } from "../../config/types/types";
import { User } from "../../models/user.model";
import dbQuery from "../connection";
import { Datasource } from "../dao/datasource.dao";
import queryList from "../queries";

export default class PostgresDatasource implements Datasource {
  getUserById(id: string): Promise<Partial<User> | undefined> {
    throw new Error("Method not implemented.");
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = (await dbQuery(queryList.GET_USER_BY_EMAIL, [
      email,
    ])) as PostgresDataType;
    return result.rows[0];
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    const result = (await dbQuery(queryList.CREATE_USER, [
      name,
      email,
      password,
    ])) as PostgresDataType;
    return result.rows[0];
  }

  async getAllUsers(): Promise<User[] | undefined> {
    const result = (await dbQuery(queryList.GET_USERS)) as PostgresDataType;
    return result.rows;
  }
}
