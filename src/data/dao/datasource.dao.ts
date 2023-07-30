import PostgresDatasource from "../dbs/postgres";
import { FoodDao } from "./food.dao";
import { RoomDao } from "./room.dao";
import { UserDao } from "./user.dao";

export interface Datasource extends UserDao, RoomDao, FoodDao {}

export let db: Datasource;

export async function initDB(dbPath?: string) {
  // db = await new SqliteDatasource().openDB(dbPath);
  db = PostgresDatasource.getInstance();
}
