import { Request } from "express";
import { ObjectId } from "mongoose";

export interface UserRegisterAttributes {
  id: ObjectId;
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