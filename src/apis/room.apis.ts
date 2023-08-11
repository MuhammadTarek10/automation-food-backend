import { Order } from "../models/order.model";
import { Room } from "../models/room.model";

export type CreateRoomRequest = Pick<Room, "name" | "code">;
export interface CreateRoomResponse {}

export interface GetAllRoomsRequest {}
export type GetAllRoomsResponse = {
  rooms: Room[];
};

export type JoinRoomRequest = Pick<Room, "code">;
export type JoinRoomResponse = {
  room: Room;
};

export type UpdateRoomRequest = Pick<Room, "id" | "name" | "code">;
export interface UpdateRoomResponse {}

export type DeleteRoomRequest = Pick<Room, "id">;
export interface DeleteRoomResponse {}

export interface GetMyRooms {}
export interface GetMyRoomsResponse {
  rooms: Room[];
}

export interface EnterRoomRequest {}
export interface EnterRoomResponse {
  orders: Order[];
}
