import { PostgresDatasource } from "../dbs/postgres";
import { FoodDao } from "./food.dao";
import { OrderDao } from "./order.dao";
import { RoomDao } from "./room.dao";
import { UserDao } from "./user.dao";

export interface Datasource extends UserDao, RoomDao, FoodDao, OrderDao {}

export let db: Datasource;

export async function initDB(dbPath?: string) {
  // db = await new SqliteDatasource().openDB(dbPath);
  db = PostgresDatasource.getInstance();
}
