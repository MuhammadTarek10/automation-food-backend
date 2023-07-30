import { Food } from "../../models/food.model";
import { FoodCategory } from "../../models/food_category.model";
import { Room } from "../../models/room.model";
import { User } from "../../models/user.model";
import dbQuery from "../connection";
import { Datasource } from "../dao/datasource.dao";
import queryList from "../queries";

export default class PostgresDatasource implements Datasource {
  private static instance: PostgresDatasource;

  private constructor() {}
  public static getInstance(): PostgresDatasource {
    if (!PostgresDatasource.instance)
      PostgresDatasource.instance = new PostgresDatasource();

    return PostgresDatasource.instance;
  }
  // * Food Category
  async createCategory(name: string, userId: string): Promise<void> {
    await dbQuery(queryList.CREATE_CATEGORY, [name, userId]);
  }
  async getCategoryById(id: string): Promise<FoodCategory> {
    return await dbQuery(queryList.GET_CATEGORY_BY_ID, [id]).then(
      (e) => e.rows[0]
    );
  }
  async getCategoryByUserId(user_id: string): Promise<FoodCategory[]> {
    return await dbQuery(queryList.GET_CATEGORY_BY_USER_ID, [user_id]).then(
      (e) => e.rows
    );
  }
  async updateCategory(id: string, name: string): Promise<void> {
    await dbQuery(queryList.UPDATE_CATEGORY, [id, name]);
  }
  async deleteCategory(id: string): Promise<void> {
    await dbQuery(queryList.DELETE_CATEGORY, [id]);
  }

  // * Food
  async createFood(
    name: string,
    user_id: string,
    category_id: string,
    price: number,
    restaurant?: string
  ): Promise<void> {
    await dbQuery(queryList.CREATE_FOOD, [
      name,
      price,
      restaurant,
      category_id,
      user_id,
    ]);
  }
  async getFoodById(id: string): Promise<Food> {
    return await dbQuery(queryList.GET_FOOD_BY_ID, [id]).then((e) => e.rows[0]);
  }
  async getFoodByUserId(user_id: string): Promise<Food[]> {
    return await dbQuery(queryList.GET_FOOD_BY_USER_ID, [user_id]).then(
      (e) => e.rows
    );
  }
  async getFoodByCategoryId(category_id: string): Promise<Food[]> {
    return await dbQuery(queryList.GET_FOOD_BY_CATEGORY_ID, [category_id]).then(
      (e) => e.rows
    );
  }
  async getFoodByRoomId(room_id: string): Promise<Food[]> {
    return await dbQuery(queryList.GET_FOOD_BY_ROOM_ID, [room_id]).then(
      (e) => e.rows
    );
  }
  async updateFood(
    name: string,
    price: number,
    restaurant?: string
  ): Promise<void> {
    await dbQuery(queryList.UPDATE_FOOD, [name, price, restaurant]);
  }
  async deleteFood(id: string): Promise<void> {
    await dbQuery(queryList.DELETE_FOOD, [id]);
  }

  // * Rooms
  async addUserToRoom(userId: string, roomId: string): Promise<void> {
    await dbQuery(queryList.ADD_USER_TO_ROOM, [userId, roomId]);
  }
  async getUsersInRoom(roomId: string): Promise<User[] | undefined> {
    return await dbQuery(queryList.ALL_USERS_IN_ROOM, [roomId]).then(
      (e) => e.rows
    );
  }
  async isUserInRoom(
    userId: string,
    roomId: string
  ): Promise<User | undefined> {
    return await dbQuery(queryList.USER_IN_ROOM, [roomId, userId]).then(
      (e) => e.rows[0]
    );
  }
  async getRoomByCode(code: String): Promise<Room | undefined> {
    return await dbQuery(queryList.GET_ROOM_BY_CODE, [code]).then(
      (e) => e.rows[0]
    );
  }

  async createRoom(name: string, code: string, userId: string): Promise<void> {
    await dbQuery(queryList.CREATE_ROOM, [name, code, userId]);
  }

  async getRoomById(id: string): Promise<Room | undefined> {
    return await dbQuery(queryList.GET_ROOM_BY_ID, [id]).then((e) => e.rows[0]);
  }

  async getRoomsByUserId(userId: string): Promise<Room[] | undefined> {
    return await dbQuery(queryList.GET_ROOM_BY_USER_ID, [userId]).then(
      (e) => e.rows
    );
  }

  async updateRoom(id: string, name: string, code: string): Promise<void> {
    await dbQuery(queryList.UPDATE_ROOM_BY_ID, [id, name, code]);
  }

  async deleteRoom(id: string): Promise<void> {
    await dbQuery(queryList.DELETE_ROOM_BY_ID, [id]);
  }

  async getAllRooms(): Promise<Room[] | undefined> {
    return await dbQuery(queryList.GET_ALL_ROOMS).then((e) => e.rows);
  }

  // * User
  async getUserById(id: string): Promise<User | undefined> {
    return await dbQuery(queryList.GET_USER_BY_ID, [id]).then((e) => e.rows[0]);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await dbQuery(queryList.GET_USER_BY_EMAIL, [email]).then(
      (e) => e.rows[0]
    );
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    return await dbQuery(queryList.CREATE_USER, [name, email, password]).then(
      (e) => e.rows[0]
    );
  }

  async getAllUsers(): Promise<User[] | undefined> {
    return await dbQuery(queryList.GET_USERS).then((e) => e.rows);
  }
}
