import { Response } from "express";

export function errorResponse(err: any, res: Response) {
    res.status(500).json({
      error: "An error occured, please try again later.",
    });
}

export function successResponse(data:any, message: string, res: Response){
  res.status(200).json({
    data,
    message
  })
}