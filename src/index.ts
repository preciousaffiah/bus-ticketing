import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sequelize from "./config/db";
import { transactionsRoutes, usersRoutes } from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({}));
app.use("/api/auth", usersRoutes);
app.use("/api/transaction", transactionsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

try {
  sequelize.authenticate(),
    sequelize.sync({ force: false }),
    console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default app;
