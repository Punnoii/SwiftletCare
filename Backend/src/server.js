import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { authRouter } from "../routes/authRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
 
app.get("/", (req, res) => {
  res.send({ status: "start server" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
