import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";
import { fail, ok } from "./utils/response.js";

const app = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "https://weaver-black.vercel.app";
const port = Number(process.env.PORT || 5000);
process.env.JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

import mongoose from "mongoose";
const mongoUri = process.env.MONGO_URI || "mongodb+srv://alok2:12332112@cluster0.b3i0g2l.mongodb.net/";
mongoose.connect(mongoUri)
  .then(() => console.log(`Connected to MongoDB at ${mongoUri}`))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  return ok(res, { status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);

app.use((_req, res) => {
  return fail(res, "Route not found", 404);
});

app.listen(port, () => {
  console.log(`Weaver API running on ${port}`);
});
