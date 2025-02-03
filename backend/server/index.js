import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import menuRouter from "./routes/menu.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

mongoose
  .connect(process.env.NEXT_PUBLIC_MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.NEXT_PUBLIC_SERVER_PORT, () => {
  console.log("Server started on:", process.env.NEXT_PUBLIC_SERVER_PORT);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
