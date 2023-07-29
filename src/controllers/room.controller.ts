import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetAllRoomsRequest,
  GetAllRoomsResponse,
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
}

export const controller = new RoomController(new PostgresDatasource());
