import { User } from "../../models/user.model";

export interface UserDao {
  getUserById(id: string): Promise<Partial<User> | undefined>;
  getUserByEmail(email: string): Promise<Partial<User> | undefined>;
  createUser(user: User): Promise<void>;
  getAllUsers(): Promise<User[] | undefined>;
}
