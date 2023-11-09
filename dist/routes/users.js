"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const usersRoutes = (0, express_1.Router)();
usersRoutes.get("/", index_1.AuthController.testing);
usersRoutes.post("/register", limiter_1.default, index_1.AuthController.register);
usersRoutes.post("/login", limiter_1.default, index_1.AuthController.login);
usersRoutes.post("/create-ticket-account", auth_1.authMiddleware, limiter_1.default, index_1.AuthController.createTicketAccount);
exports.default = usersRoutes;
//# sourceMappingURL=users.js.map