import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const users = catchAsync(async (req: Request, res: Response) => {
  // const { ...registerData } = req.body;
  const response = await UserService.userList();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User list  !",
    data: response,
  });
});

export const userController = {
  users,
};
