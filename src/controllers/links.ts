import { Request, Response } from "express";
import { Links } from "../models/index";
import crypto from "crypto";

export class LinksController {
  static async test(req: Request, res: Response) {
    try {
      return res.status(200).send({
        message: "API Alive.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occured",
      });
    }
  }

  static async createShortURL(req: Request, res: Response) {
    try {
      const { longURL } = req.body;
      const linkExists = await Links.findOne({ longURL });

      if (linkExists) {
        return res.status(200).json({
          data: linkExists.shortURL,
          message: "Link already exists"
        });
      }

      const uniqueID = crypto.randomBytes(2).toString("hex");
      const newLink = new Links({
        longURL,
        shortURL: uniqueID,
      });
      await newLink.save();

      return res.status(200).json({
        data: `http://localhost:4000/api/link/${newLink.shortURL}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occured",
      });
    }
  }

  static async findShortURL(req: Request, res: Response) {
    try {
      const { uniqueid } = req.params;
      const found = await Links.findOne({ shortURL:uniqueid });

      if (found) {
        return res.status(302).redirect(found.longURL);
      }
      return res.status(404).json({
        message: "Link not found",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occured",
      });
    }
  }
}
