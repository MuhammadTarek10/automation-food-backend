import { Food } from "../../models/food.model";
import { FoodCategory } from "../../models/food_category.model";
import { Order } from "../../models/order.model";
import { Room } from "../../models/room.model";
import { User } from "../../models/user.model";
import dbQuery from "../connection";
import { Datasource } from "../dao/datasource.dao";
import queryList from "../queries";

export class PostgresDatasource implements Datasource {
  private static instance: PostgresDatasource;

  private constructor() {}

  public static getInstance(): PostgresDatasource {
    if (!PostgresDatasource.instance)
      PostgresDatasource.instance = new PostgresDatasource();

    return PostgresDatasource.instance;
  }

  // * Order
  async createOrder(
    userId: string,
    roomId: string,
    foodId: string,
    quantity: number
  ): Promise<Food> {
    for (let i = 0; i < quantity; i++) {
      const id = await dbQuery(queryList.ADD_ORDER, [userId, roomId]).then(
        (e) => e.rows[0].id
      );
      await dbQuery(queryList.ADD_ORDERS_FOOD, [id, foodId]);
    }
    return await dbQuery(queryList.GET_ORDERS_BY_ROOM, [roomId]).then(
      (e) => e.rows[0]
    );
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
    price: number,
    room_id: string,
    restaurant?: string
  ): Promise<string> {
    const row = await dbQuery(queryList.CREATE_FOOD, [
      name,
      price,
      restaurant,
      user_id,
    ]);
    const id = row.rows[0].id;
    await dbQuery(queryList.ADD_FOOD_TO_ROOM, [id, room_id, user_id]);
    return id;
  }
  async addFoodToRoom(
    foodId: string,
    roomId: string,
    userId: string
  ): Promise<void> {
    await dbQuery(queryList.ADD_FOOD_TO_ROOM, [foodId, roomId, userId]);
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

  async updateFood(
    id: string,
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

  async getMyRooms(userId: string): Promise<Room[] | undefined> {
    return await dbQuery(queryList.GET_MY_ROOMS, [userId]).then((e) => e.rows);
  }

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

  async getOrdersByRoomId(room_id: string): Promise<Order[]> {
    return await dbQuery(queryList.GET_ORDERS_BY_ROOM, [room_id]).then(
      (e) => e.rows
    );
  }

  async deleteOrdersByRoomId(room_id: string): Promise<void> {
    await dbQuery(queryList.DELETE_ORDERS_BY_ROOM, [room_id]);
  }

  async getFoodByRoomId(room_id: string): Promise<Food[]> {
    return await dbQuery(queryList.GET_FOOD_BY_ROOM_ID, [room_id]).then(
      (e) => e.rows
    );
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
  ): Promise<void> {
    await dbQuery(queryList.CREATE_USER, [name, email, password]);
  }

  async getAllUsers(): Promise<User[] | undefined> {
    return await dbQuery(queryList.GET_USERS).then((e) => e.rows);
  }
}
