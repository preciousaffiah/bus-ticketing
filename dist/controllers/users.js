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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const index_1 = require("../models/index");
const response_1 = require("../helpers/response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static testing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send({ message: "up and running" });
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = req.body;
                const takenEmail = yield index_1.Users.findOne({ where: { email: User.email } });
                if (takenEmail) {
                    return res.status(400).json({
                        message: "This email has already been used. Try another one.",
                    });
                }
                const takenMobile = yield index_1.Users.findOne({
                    where: { mobile: User.mobile },
                });
                if (takenMobile) {
                    return res.status(400).json({
                        message: "This mobile number has already been used. Try another one.",
                    });
                }
                const passwordHash = yield bcrypt_1.default.hash(User.password, 10);
                const user = yield index_1.Users.create({
                    fullname: User.fullname.toLowerCase(),
                    email: User.email.toLowerCase(),
                    mobile: User.mobile,
                    password: passwordHash,
                });
                const { id, fullname, email, mobile, } = user;
                const userData = { id, fullname, email, mobile, };
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({ user: userData }, process.env.JWT_SECRET || "", {
                    expiresIn: "100d",
                });
                return (0, response_1.successResponse)({ token, data: user }, "Accout registration successful.", res);
            }
            catch (err) {
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = req.body;
                const user = yield index_1.Users.findOne({
                    where: { email: User.email.toLowerCase() },
                });
                if (!user) {
                    return res.status(404).json({
                        message: "This account does not exist",
                    });
                }
                // Compare the password
                const passwordMatch = yield bcrypt_1.default.compare(User.password, user.password);
                if (!passwordMatch) {
                    return res.status(400).json({ message: "Invalid email or password." });
                }
                const { id, fullname, email, mobile, } = user;
                const userData = { id, fullname, email, mobile, };
                const token = jsonwebtoken_1.default.sign({ user: userData }, process.env.JWT_SECRET || "", {
                    expiresIn: "100d",
                });
                return (0, response_1.successResponse)({ token, data: user }, "Login successful.", res);
            }
            catch (err) {
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
    static createTicketAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const id = req.user.id;
                const ticketAccountExists = yield index_1.TicketAccounts.findOne({
                    where: { userId: id },
                });
                if (ticketAccountExists) {
                    return res.status(400).json({
                        message: "Ticket account already exists"
                    });
                }
                const ticketAccount = yield index_1.TicketAccounts.create({
                    userId: id,
                });
                return (0, response_1.successResponse)({ data: ticketAccount }, "Bus ticket account created.", res);
            }
            catch (err) {
                return (0, response_1.errorResponse)(err, res);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=users.js.map