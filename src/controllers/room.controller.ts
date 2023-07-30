import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  DeleteRoomResponse,
  GetAllRoomsRequest,
  GetAllRoomsResponse,
  JoinRoomRequest,
  JoinRoomResponse,
  UpdateRoomRequest,
  UpdateRoomResponse,
} from "../apis/room.apis";
import { ExpressHandler } from "../config/types/types";
import { Datasource } from "../data/dao/datasource.dao";
import PostgresDatasource from "../data/dbs/postgres";
import { LoggerService } from "../services/logger.service";

class RoomController {
  private db: Datasource;
  private logger: LoggerService;

  constructor(db: Datasource) {
    this.logger = new LoggerService("room.controller");
    this.db = db;
  }

  createRoom: ExpressHandler<CreateRoomRequest, CreateRoomResponse> = async (
    req,
    res
  ) => {
    const admin_id = res.locals.userId;
    const { name, code } = req.body;
    if (!admin_id || !name || !code)
      return res.status(401).send({ error: "Invalid Inputs" });
    const existing = await this.db.getRoomByCode(code);
    if (existing) return res.status(401).send({ error: "Room Exists" });
    await this.db.createRoom(name, code, admin_id);
    return res.sendStatus(200);
  };

  getAllRooms: ExpressHandler<GetAllRoomsRequest, GetAllRoomsResponse> = async (
    req,
    res
  ) => {
    const rooms = await this.db.getAllRooms();
    return res.send({ rooms });
  };

  updateRoom: ExpressHandler<UpdateRoomRequest, UpdateRoomResponse> = async (
    req,
    res
  ) => {
    const { id, name, code } = req.body;
    const userId = res.locals.userId;
    if (!id || !name || !code)
      return res.status(401).send({ error: "Enter Parameters" });

    const room = await this.db.getRoomById(id);
    if (!room) return res.status(404).send({ error: "No Room" });
    if (userId !== room.admin_id)
      return res.status(403).send({ error: "Unauthorized" });

    await this.db.updateRoom(id, name, code);
    return res.sendStatus(200);
  };

  deleteRoom: ExpressHandler<DeleteRoomRequest, DeleteRoomResponse> = async (
    req,
    res
  ) => {};

  joinRoom: ExpressHandler<JoinRoomRequest, JoinRoomResponse> = async (
    req,
    res
  ) => {
    const { code } = req.body;
    const userId = res.locals.userId;
    if (!code) return res.status(401).send({ error: "Insert Code" });

    const room = await this.db.getRoomByCode(code);
    if (!room) return res.status(404).send({ error: "No room with this code" });

    const inRoom = await this.db.isUserInRoom(userId, room.id);
    if (inRoom || userId === room.admin_id)
      return res.status(200).send({ room: room });
    else await this.db.addUserToRoom(userId, room.id);

    return res.status(201).send({ room: room });
  };
}

export const controller = new RoomController(new PostgresDatasource());
