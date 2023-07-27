import { PostgresDatasource } from "../dbs/postgres";
import { UserDao } from "./user.dao";

export interface Datasource extends UserDao {}

export let db: Datasource;

export async function initDB(dbPath?: string) {
  // db = await new SqliteDatasource().openDB(dbPath);
  db = new PostgresDatasource();
}
