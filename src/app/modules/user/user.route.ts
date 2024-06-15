import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();
router.get(
  "/list",
  auth('user'),
  userController.users
  
);
// router.get(
//   "/user/:id",
//   auth('user'),
//   validateRequest(AuthValidation.registerZodSchema),
//   AuthController.registerUser
// );

export const UserRoutes = router;
