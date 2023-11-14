import mongoose, { ObjectId } from "mongoose";

export interface TransationsDocument extends mongoose.Document {
  _id: ObjectId;
  from: ObjectId;
  to: ObjectId | null;
  amount: number;
  description: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date | null;
}

const TransactionsSchema = new mongoose.Schema<TransationsDocument>({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "TicketAccounts", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "TicketAccounts", required: false },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  balance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Transactions = mongoose.model<TransationsDocument>("Transactions", TransactionsSchema);

export default Transactions;