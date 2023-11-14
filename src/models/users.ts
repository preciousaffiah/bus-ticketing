import mongoose, { ObjectId } from "mongoose";

export interface UsersDocument extends mongoose.Document {
  _id: ObjectId;
  fullname: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: Date;
}

const usersSchema = new mongoose.Schema<UsersDocument>({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.model<UsersDocument>("Users", usersSchema);

export default Users;