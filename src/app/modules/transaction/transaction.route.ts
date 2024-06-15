import express from "express";
import auth from "../../middlewares/auth";
import { transactionController } from "./transaction.controller";

const router = express.Router();
router.get("/list", auth("user"), transactionController.transactions);
router.post("/store", auth("user"), transactionController.store);
router.delete("/:id", auth("user"), transactionController.destroy);

export const TransactionRoutes = router;
