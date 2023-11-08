"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const transactionsRoutes = (0, express_1.Router)();
transactionsRoutes.get("/get-transactions", auth_1.authMiddleware, limiter_1.default, index_1.TransactionController.getMyTransactions);
transactionsRoutes.post("/fund", auth_1.authMiddleware, limiter_1.default, index_1.TransactionController.creditMyAccount);
transactionsRoutes.post("/ticket-pay", auth_1.authMiddleware, limiter_1.default, index_1.TransactionController.ticketPayment);
transactionsRoutes.post("/transfer", auth_1.authMiddleware, limiter_1.default, index_1.TransactionController.Transfer);
transactionsRoutes.get("/balance", auth_1.authMiddleware, limiter_1.default, index_1.TransactionController.getMyBalance);
exports.default = transactionsRoutes;
//# sourceMappingURL=transactions.js.map