import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();
router.get("/list", userController.users);
router.get("/", auth("user"), userController.getUser);

export const UserRoutes = router;
