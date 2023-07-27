import { PostgresDataType } from "../../config/types/types";
import { User } from "../../models/user.model";
import dbQuery from "../connection";
import { Datasource } from "../dao/datasource.dao";
import queryList from "../queries";

export class PostgresDatasource implements Datasource {
  getUserById(id: string): Promise<Partial<User> | undefined> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<Partial<User> | undefined> {
    throw new Error("Method not implemented.");
  }
  createUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getAllUsers(): Promise<User[] | undefined> {
    const result = (await dbQuery(queryList.GET_USERS)) as PostgresDataType;
    return result.rows;
  }
}
