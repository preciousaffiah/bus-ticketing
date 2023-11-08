import { AuthController } from "../controllers/index";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import rateLimiter from "middlewares/limiter";

const usersRoutes = Router();

usersRoutes.post("/register", rateLimiter, AuthController.register);
usersRoutes.post("/login", rateLimiter, AuthController.login);
usersRoutes.post("/create-ticket-account", authMiddleware , rateLimiter, AuthController.createTicketAccount);

export default usersRoutes;