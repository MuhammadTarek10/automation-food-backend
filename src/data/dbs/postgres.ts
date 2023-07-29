import { PostgresDataType } from "../../config/types/types";
import { Room } from "../../models/room.model";
import { User } from "../../models/user.model";
import dbQuery from "../connection";
import { Datasource } from "../dao/datasource.dao";
import queryList from "../queries";

export default class PostgresDatasource implements Datasource {
  async getRoomByCode(code: String): Promise<Room | undefined> {
    const result = (await dbQuery(queryList.GET_ROOM_BY_CODE, [
      code,
    ])) as PostgresDataType;
    return result.rows[0];
  }
  // * Rooms
  async createRoom(name: string, code: string, userId: string): Promise<void> {
    await dbQuery(queryList.CREATE_ROOM, [name, code, userId]);
  }
  getRoomById(id: string): Promise<Room | undefined> {
    throw new Error("Method not implemented.");
  }
  getRoomsByUserId(userId: string): Promise<Room[] | undefined> {
    throw new Error("Method not implemented.");
  }
  updateRoom(id: string, name: string, code: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteRoom(id: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getAllRooms(): Promise<Room[] | undefined> {
    const result = (await dbQuery(queryList.GET_ALL_ROOMS)) as PostgresDataType;
    return result.rows as Room[];
  }

  // * User
  async getUserById(id: string): Promise<User | undefined> {
    const result = (await dbQuery(queryList.GET_USER_BY_ID, [
      id,
    ])) as PostgresDataType;
    return result.rows[0];
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
