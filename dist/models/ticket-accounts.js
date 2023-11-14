"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TicketAccountsSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true },
    balance: { type: Number, ref: "Transactions", default: 0.00, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const TicketAccounts = mongoose_1.default.model("TicketAccounts", TicketAccountsSchema);
exports.default = TicketAccounts;
//# sourceMappingURL=ticket-accounts.js.map