import { Room } from "../models/room.model";

export type CreateRoomRequest = Pick<Room, "name" | "code">;
export interface CreateRoomResponse {}

export interface GetAllRoomsRequest {}
export type GetAllRoomsResponse = {
  rooms: Room[];
};
