import { Room } from "../../models/room.model";
import { User } from "../../models/user.model";

export interface RoomDao {
  createRoom(name: string, code: string, userId: string): Promise<void>;
  getRoomById(id: string): Promise<Room | undefined>;
  getRoomByCode(code: String): Promise<Room | undefined>;
  getRoomsByUserId(userId: string): Promise<Room[] | undefined>;
  updateRoom(id: string, name: string, code: string): Promise<void>;
  deleteRoom(id: string): Promise<void>;
  getAllRooms(): Promise<Room[] | undefined>;
  getUsersInRoom(roomId: string): Promise<User[] | undefined>;
  isUserInRoom(userId: string, roomId: string): Promise<User | undefined>;
  addUserToRoom(userId: string, roomId: string): Promise<void>;
}
