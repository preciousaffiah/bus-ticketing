"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionsSchema = new mongoose_1.default.Schema({
    from: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "TicketAccounts", required: true },
    to: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "TicketAccounts", required: false },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    balance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Transactions = mongoose_1.default.model("Transactions", TransactionsSchema);
exports.default = Transactions;
//# sourceMappingURL=transactions.js.map