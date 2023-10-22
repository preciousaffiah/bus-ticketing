import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { linksRoutes } from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({}));
app.use("/api", linksRoutes);

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  export default app;