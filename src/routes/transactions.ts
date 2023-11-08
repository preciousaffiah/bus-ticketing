import { TransactionController } from "../controllers/index";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import rateLimiter from "middlewares/limiter";

const transactionsRoutes = Router();

transactionsRoutes.get("/get-transactions", authMiddleware, rateLimiter, TransactionController.getMyTransactions);
transactionsRoutes.post("/fund", authMiddleware, rateLimiter, TransactionController.creditMyAccount);
transactionsRoutes.post("/ticket-pay", authMiddleware, rateLimiter, TransactionController.ticketPayment);
transactionsRoutes.post("/transfer", authMiddleware, rateLimiter, TransactionController.Transfer);
transactionsRoutes.get("/balance", authMiddleware, rateLimiter, TransactionController.getMyBalance);


export default transactionsRoutes;