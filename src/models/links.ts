import mongoose from "mongoose";

export interface LinksDocument extends mongoose.Document {
  longURL: string;
  shortURL: string;
  createdAt: Date;
}

const linksSchema = new mongoose.Schema<LinksDocument>({
  longURL: { type: String, required: true },
  shortURL: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Links = mongoose.model<LinksDocument>("Links", linksSchema);

export default Links;
