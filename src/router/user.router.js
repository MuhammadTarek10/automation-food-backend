import express from "express";
import { Endpoints } from "../config/api/endpoints.js";
import { controller } from "../controllers/user.controller.js";
const router = express.Router();

router.get(Endpoints.USERS.GET_USERS, controller.getAllUsers);
router.post(Endpoints.USERS.CREATE_USER, controller.createUser);

export default router;
