import express from "express";
import { Endpoints } from "../config/api/endpoints";
import { controller } from "../controllers/user.controller";
const router = express.Router();

router.get(Endpoints.USERS.GET_USERS, controller.getAllUsers);

// router.get(Endpoints.USERS.GET_USERS, UserController.getAll);
// router.post(Endpoints.USERS.REGISTER, controller.register);
// router.post(Endpoints.USERS.LOGIN, controller.login);
// router.post(Endpoints.USERS.LOGOUT, auth, controller.logout);

export default router;
