"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const index_1 = require("../models/index");
const response_1 = require("../helpers/response");
class TransactionController {
    static getMyTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const id = req.user.id;
                const page = Number(req.query.page) || 1;
                const perPage = 20;
                const currentYear = new Date().getFullYear();
                const month = Number(req.query.month) || new Date().getMonth();
                const myTicketAccount = yield index_1.TicketAccounts.findOne({ userId: id });
                if (!myTicketAccount) {
                    return res.status(404).json({
                        message: "You do not have a ticket account, Please create one.",
                    });
                }
                const myTransactions = yield index_1.Transactions.find()
                    .where({ $or: [{ from: myTicketAccount._id },
                        { to: myTicketAccount._id }],
                })
                    .populate("from", ["fullname"])
                    .populate("to", ["fullname"])
                    .sort({ _id: -1 })
                    .skip((page - 1) * perPage)
                    .limit(perPage);
                if (myTransactions.length === 0) {
                    return res.status(200).json({
                        message: "You have no transactions record.",
                    });
                }
                return (0, response_1.successResponse)({ data: myTransactions }, `Page ${page}.`, res);
            }
            catch (err) {
                console.log(err);
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
    static creditMyAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const id = req.user.id;
                const amount = req.body.amount;
                const myTicketAccount = yield index_1.TicketAccounts.findOne({ userId: id });
                if (!myTicketAccount) {
                    return res.status(404).json({
                        message: "You do not have a ticket account, Please create one.",
                    });
                }
                myTicketAccount.balance = myTicketAccount.balance + amount;
                yield myTicketAccount.save();
                const credit = yield index_1.Transactions.create({
                    from: myTicketAccount.id,
                    to: myTicketAccount.id,
                    amount: amount,
                    description: "funded my account",
                    balance: myTicketAccount.balance,
                });
                return (0, response_1.successResponse)({ data: credit }, "Your account has been credited by you.", res);
            }
            catch (err) {
                console.log(err);
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
    static Transfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const id = req.user.id;
                const amount = req.body.amount;
                const to = req.body.to;
                const myTicketAccount = yield index_1.TicketAccounts.findOne({ userId: id });
                if (!myTicketAccount) {
                    return res.status(404).json({
                        message: "You do not have a ticket account, Please create one.",
                    });
                }
                if (to === myTicketAccount.id) {
                    return res.status(400).json({
                        message: "You cannot transfer money to yourself.",
                    });
                }
                const recipient = yield index_1.TicketAccounts.findOne({ _id: to });
                if (!recipient) {
                    return res.status(404).json({
                        message: "The ticket account you're trying to send money to does not exist.",
                    });
                }
                if (myTicketAccount.balance < amount) {
                    return res.status(400).json({
                        message: "Insufficient funds",
                    });
                }
                const transfer = yield index_1.Transactions.create({
                    from: myTicketAccount.id,
                    to: to,
                    amount: amount,
                    // type: 'debit',
                    description: `transfer to ${to}`,
                    balance: myTicketAccount.balance - amount,
                });
                yield myTicketAccount.updateOne({
                    balance: myTicketAccount.balance - amount,
                });
                yield recipient.updateOne({ balance: recipient.balance + amount });
                return (0, response_1.successResponse)({ data: transfer }, "Transaction Successful.", res);
            }
            catch (err) {
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
    static getMyBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const id = req.user.id;
                const myTicketAccount = yield index_1.TicketAccounts.findOne({ userId: id });
                if (!myTicketAccount) {
                    return res.status(404).json({
                        message: "You do not have a ticket account, Please create one.",
                    });
                }
                return (0, response_1.successResponse)({ data: myTicketAccount.balance }, `your current balance is ${myTicketAccount.balance}.`, res);
            }
            catch (err) {
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
    static ticketPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const id = req.user.id;
                const amount = req.body.amount;
                const destination = req.body.destination;
                const myTicketAccount = yield index_1.TicketAccounts.findOne({ userId: id });
                if (!myTicketAccount) {
                    return res.status(404).json({
                        message: "You do not have a ticket account, Please create one.",
                    });
                }
                if (myTicketAccount.balance < amount) {
                    return res.status(400).json({
                        message: "Insufficient funds",
                    });
                }
                myTicketAccount.balance = myTicketAccount.balance - amount;
                yield myTicketAccount.save();
                const pay = yield index_1.Transactions.create({
                    from: myTicketAccount.id,
                    // type: 'debit',
                    amount: amount,
                    description: `payment for ticket to ${destination}`,
                    balance: myTicketAccount.balance,
                });
                return (0, response_1.successResponse)({ data: pay }, "payment successful.", res);
            }
            catch (err) {
                console.log(err);
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transactions.js.map