import PostgresDatasource from "../dbs/postgres";
import { RoomDao } from "./room.dao";
import { UserDao } from "./user.dao";

export interface Datasource extends UserDao, RoomDao {}

export let db: Datasource;

export async function initDB(dbPath?: string): Promise<void> {
  // db = await new SqliteDatasource().openDB(dbPath);
  db = new PostgresDatasource();
}
