import { Request } from "express";
import { UUID } from "sequelize/types";

export interface UserRegisterAttributes {
  id: typeof UUID;
  fullname: string;
  email: string;
  mobile: string;
  password: string;
}

export interface UserLoginAttributes {
  email: string;
  password: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}