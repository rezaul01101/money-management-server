import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TransactionService } from "./transaction.service";

const transactions = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const response = await TransactionService.transactionList(token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction list  !",
    data: response,
  });
});
const store = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const data = req.body;
  const response = await TransactionService.transactionCreate(data, token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction created!",
    data: response,
  });
});
const destroy = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = parseInt(req.params.id);
  const response = await TransactionService.deleteFromDB(id, token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction deleted!",
    data: response,
  });
});

export const transactionController = {
  transactions,
  store,
  destroy,
};
