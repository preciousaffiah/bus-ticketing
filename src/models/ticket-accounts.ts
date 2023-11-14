import mongoose, { ObjectId } from "mongoose";

export interface TicketAccountsDocument extends mongoose.Document {
  _id: ObjectId;
  userId: ObjectId;
  balance: number;
  createdAt: Date;
  updatedAt: Date | null;
}

const TicketAccountsSchema = new mongoose.Schema<TicketAccountsDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  balance: { type: Number, ref: "Transactions", default: 0.00, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TicketAccounts = mongoose.model<TicketAccountsDocument>("TicketAccounts", TicketAccountsSchema);

export default TicketAccounts;