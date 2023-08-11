import express from "express";
import { Endpoints } from "../config/api/endpoints";
import { controller } from "../controllers/room.controller";

const router = express.Router();

router.post(Endpoints.ROOM.CREATE_ROOM, controller.createRoom);
router.get(Endpoints.ROOM.GET_ALL_ROOMS, controller.getAllRooms);
router.get(Endpoints.ROOM.GET_MY_ROOMS, controller.getMyRooms);
router.put(Endpoints.ROOM.JOIN_ROOM, controller.joinRoom);
router.put(Endpoints.ROOM.UPDATE_ROOM, controller.updateRoom);
router.delete(Endpoints.ROOM.DELETE_ROOM, controller.deleteRoom);
router.get(Endpoints.ROOM.GET_ROOM, controller.enterRoom);

export default router;
