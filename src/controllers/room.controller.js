import connection from "../database/connection.js";
import queries from "../database/queries.js";
import { StatusCodes } from "../config/constants/status_codes.js";
import { Room } from "../models/room.model.js";
import { StatusCodeStrings } from "../config/constants/strings.js";
import { LoggerService } from "../services/logger.service.js";
import { Validator } from "../utils/validator.js";

class RoomController {
  constructor() {
    this.logger = new LoggerService("room.controller");
    this.getAllRooms = this.getAllRooms.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.getMyRooms = this.getMyRooms.bind(this);
  }

  async getAllRooms(req, res) {
    try {
      const { rows } = await connection(queries.GET_ALL_ROOMS);
      res.json(rows);
      this.logger.info("Get All Rooms");
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async addRoom(req, res) {
    try {
      const result = await connection(queries.GET_USER_BY_EMAIL, [
        req.user.email,
      ]);
      if (!result.rows[0])
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(StatusCodeStrings.USER_NOT_FOUND);

      const admin_id = result.rows[0].id;
      const { name, code } = req.body;
      const validator = new Validator();
      const room = new Room(name, code, admin_id);
      if (!validator.isValidRoom(room))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.INVALID_ROOM);

      await connection(queries.ADD_ROOM, [room.name, room.code, room.admin_id]);

      this.logger.info("Add Room");
      res.status(StatusCodes.CREATED).json(room);
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async joinRoom(req, res) {
    try {
      const result = await connection(queries.GET_USER_BY_EMAIL, [
        req.user.email,
      ]);
      if (!result.rows[0])
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(StatusCodeStrings.USER_NOT_FOUND);

      const user_id = result.rows[0].id;
      const { code } = req.body;
      const validator = new Validator();
      if (!validator.isValidCode(code))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.INVALID_CODE);

      const room = await connection(queries.GET_ROOM_BY_CODE, [code]);
      if (!room.rows[0])
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(StatusCodeStrings.INVALID_CODE);

      const room_id = room.rows[0].id;
      const users = await connection(queries.USERS_IN_ROOM, [room_id, user_id]);
      const admin = await connection(queries.GET_ROOM_ADMIN, [
        room_id,
        user_id,
      ]);
      if (users.rows[0] || admin.rows[0])
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(StatusCodeStrings.USER_ALREADY_IN_ROOM);

      await connection(queries.ADD_USER_TO_ROOM, [user_id, room_id]);
      this.logger.info("Join Room");
      res.status(StatusCodes.CREATED).json(room.rows[0]);
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }

  async getMyRooms(req, res) {
    try {
      const user_id = req.params.id;
      const rooms = await connection(queries.GET_ROOM_BY_USER_ID, [user_id]);
      this.logger.info("Get My Rooms");
      res.status(StatusCodes.OK).json(rooms.rows);
    } catch (err) {
      this.logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).send(StatusCodeStrings.BAD_REQUEST);
    }
  }
}

export const controller = new RoomController();
