import { Request, Response } from "express";
import { TicketAccounts, Transactions } from "../models/index";
import { errorResponse, successResponse } from "../helpers/response";

export class TransactionController {
  static async getMyTransactions(req: Request, res: Response) {
    try {
      //@ts-ignore
      const id = req.user.id;
      const page = Number(req.query.page) || 1;
      const perPage = 20;
      const currentYear = new Date().getFullYear();
      const month = Number(req.query.month) || new Date().getMonth();

      const myTicketAccount = await TicketAccounts.findOne({ userId: id });
      if (!myTicketAccount) {
        return res.status(404).json({
          message: "You do not have a ticket account, Please create one.",
        });
      }

    const myTransactions = await Transactions.find()
      .where({ $or: 
        [{ from: myTicketAccount._id },
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

      return successResponse({ data: myTransactions }, `Page ${page}.`, res);
    } catch (err) {
      console.log(err);

      return errorResponse(err, res);
    }
  }

  static async creditMyAccount(req: Request, res: Response) {
    try {
      //@ts-ignore
      const id = req.user.id;
      const amount: number = req.body.amount;

      const myTicketAccount = await TicketAccounts.findOne({ userId: id });
      if (!myTicketAccount) {
        return res.status(404).json({
          message: "You do not have a ticket account, Please create one.",
        });
      }

      myTicketAccount.balance = myTicketAccount.balance + amount;
      await myTicketAccount.save();

      const credit = await Transactions.create({
        from: myTicketAccount.id,
        to: myTicketAccount.id,
        amount: amount,
        description: "funded my account",
        balance: myTicketAccount.balance,
      });

      return successResponse(
        { data: credit },
        "Your account has been credited by you.",
        res
      );
    } catch (err) {
      console.log(err);

      return errorResponse(err, res);
    }
  }

  static async Transfer(req: Request, res: Response) {
    try {
      //@ts-ignore
      const id = req.user.id;
      const amount = req.body.amount as number;
      const to = req.body.to;

      const myTicketAccount = await TicketAccounts.findOne({ userId: id });
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

      const recipient = await TicketAccounts.findOne({ _id: to });
      if (!recipient) {
        return res.status(404).json({
          message:
            "The ticket account you're trying to send money to does not exist.",
        });
      }

      if (myTicketAccount.balance < amount) {
        return res.status(400).json({
          message: "Insufficient funds",
        });
      }

      const transfer = await Transactions.create({
        from: myTicketAccount.id,
        to: to,
        amount: amount,
        // type: 'debit',
        description: `transfer to ${to}`,
        balance: myTicketAccount.balance - amount,
      })

      await myTicketAccount.updateOne({
        balance: myTicketAccount.balance - amount,
      });
      await recipient.updateOne({ balance: recipient.balance + amount });

      return successResponse(
        { data: transfer },
        "Transaction Successful.",
        res
      );
    } catch (err) {
      return errorResponse(err, res);
    }
  }

  static async getMyBalance(req: Request, res: Response) {
    try {
      //@ts-ignore
      const id = req.user.id;

      const myTicketAccount = await TicketAccounts.findOne({ userId: id });
      if (!myTicketAccount) {
        return res.status(404).json({
          message: "You do not have a ticket account, Please create one.",
        });
      }

      return successResponse(
        { data: myTicketAccount.balance },
        `your current balance is ${myTicketAccount.balance}.`,
        res
      );
    } catch (err) {
      return errorResponse(err, res);
    }
  }

  static async ticketPayment(req: Request, res: Response) {
    try {
      //@ts-ignore
      const id = req.user.id;
      const amount = req.body.amount;
      const destination = req.body.destination;

      const myTicketAccount = await TicketAccounts.findOne({ userId: id });

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
      await myTicketAccount.save();

      const pay = await Transactions.create({
        from: myTicketAccount.id,
        // type: 'debit',
        amount: amount,
        description: `payment for ticket to ${destination}`,
        balance: myTicketAccount.balance,
      });

      return successResponse({ data: pay }, "payment successful.", res);
    } catch (err) {
      console.log(err);

      return errorResponse(err, res);
    }
  }
}
