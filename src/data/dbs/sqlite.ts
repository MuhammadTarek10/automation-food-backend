import path from "path";
import { Database, open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";
import { User } from "../../models/user.model";
import { Datasource } from "../dao/datasource.dao";
import queryList from "../queries";

export class SqliteDatasource implements Datasource {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDB(dbPath: string) {
    try {
      this.db = await sqliteOpen({
        filename: dbPath,
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE,
      });
    } catch (e) {
      console.log(e);
      process.exit(1);
    }

    this.db.run("PRAGMA foreign_keys = ON;");
    await this.db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });

    return this;
  }

  async getUserById(id: string): Promise<Partial<User> | undefined> {
    return await this.db.get<Partial<User>>(queryList.GET_USER_BY_ID, [id]);
  }
  async getUserByEmail(email: string): Promise<Partial<User> | undefined> {
    return await this.db.get<Partial<User>>(queryList.GET_USER_BY_EMAIL, [
      email,
    ]);
  }
  async createUser(user: User): Promise<void> {
    await this.db.run(queryList.CREATE_USER, [
      user.name,
      user.email,
      user.password,
    ]);
  }
  async getAllUsers(): Promise<User[] | undefined> {
    return await this.db.all<User[]>(queryList.GET_USERS);
  }
}
