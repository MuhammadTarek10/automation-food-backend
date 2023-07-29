import { Room } from "../../models/room.model";

export interface RoomDao {
  createRoom(name: string, code: string, userId: string): Promise<void>;
  getRoomById(id: string): Promise<Room | undefined>;
  getRoomByCode(code: String): Promise<Room | undefined>;
  getRoomsByUserId(userId: string): Promise<Room[] | undefined>;
  updateRoom(id: string, name: string, code: string): Promise<void>;
  deleteRoom(id: string, userId: string): Promise<void>;
  getAllRooms(): Promise<Room[] | undefined>;
}
