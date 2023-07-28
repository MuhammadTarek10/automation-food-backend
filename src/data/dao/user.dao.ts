import { User } from "../../models/user.model";

export interface UserDao {
  getUserById(id: string): Promise<Partial<User> | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(name: string, email: string, password: string): Promise<string>;
  getAllUsers(): Promise<User[] | undefined>;
}
