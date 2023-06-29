import express from "express";
import { Endpoints } from "../config/api/endpoints.js";
import { controller } from "../controllers/room.controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get(Endpoints.ROOM.GET_ALL_ROOMS, controller.getAllRooms);
router.get(Endpoints.ROOM.GET_MY_ROOMS, controller.getMyRooms);
router.post(Endpoints.ROOM.ADD_ROOM, auth, controller.addRoom);
router.post(Endpoints.ROOM.JOIN_ROOM, auth, controller.joinRoom);

export default router;
