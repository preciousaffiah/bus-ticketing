import { Request, Response } from "express";
import { TicketAccounts, Users } from "../models/index";
import type { UserLoginAttributes, UserRegisterAttributes } from "../../types";
import { errorResponse, successResponse } from "../helpers/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  
  static async testing(req: Request, res: Response) {
   return res.send({ data:"Hello world" })
  }

  static async register(req: Request, res: Response) {
    try {
      const User = req.body as UserRegisterAttributes;

      const takenEmail = await Users.findOne({ email: User.email });
      if (takenEmail) {
        return res.status(400).json({
          message: "This email has already been used. Try another one.",
        });
      }
      const takenMobile = await Users.findOne({ mobile: User.mobile });
      if (takenMobile) {
        return res.status(400).json({
          message: "This mobile number has already been used. Try another one.",
        });
      }

      const passwordHash = await bcrypt.hash(User.password, 10);
      const user = await Users.create({
        fullname: User.fullname.toLowerCase(),
        email: User.email.toLowerCase(),
        mobile: User.mobile,
        password: passwordHash,
      });

      const { id, fullname, email, mobile, } = user;
      const userData = { id, fullname, email, mobile, };

      // Generate JWT token
      const token = jwt.sign(
        { user: userData },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "100d",
        }
      );

      return successResponse({ token, data: user }, "Accout registration successful.", res);
    } catch (err) {
      return errorResponse(err, res);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const User = req.body as UserLoginAttributes;

      const user = await Users.findOne({ email: User.email.toLowerCase() });

      if (!user) {
        return res.status(404).json({
          message: "This account does not exist",
        });
      }

      // Compare the password
      const passwordMatch = await bcrypt.compare(User.password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      const { id, fullname, email, mobile, } = user;
      const userData = { id, fullname, email, mobile, };

      const token = jwt.sign(
        { user: userData },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "100d",
        }
      );

      return successResponse({ token, data: user }, "Login successful.", res);
    } catch (err) {
      return errorResponse(err, res);
    }
  }

  static async createTicketAccount(req: Request, res: Response) {
    try {

      //@ts-ignore
      const id = req.user.id;

      const ticketAccountExists = await TicketAccounts.findOne({ userId: id });

      if (ticketAccountExists) {
        return res.status(400).json({
          message: "Ticket account already exists"
        })
      }

      const ticketAccount = await TicketAccounts.create({
        userId: id,
      });

      return successResponse({ data: ticketAccount }, "Bus ticket account created.", res);
    } catch (err) {
      console.log(err)
      return errorResponse(err, res);
    }
  }
}
