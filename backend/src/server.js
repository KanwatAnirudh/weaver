import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";
import { fail, ok } from "./utils/response.js";

const app = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const port = Number(process.env.PORT || 5000);
process.env.JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

import mongoose from "mongoose";
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/weaver";
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
  console.log(`Weaver API running on http://localhost:${port}`);
});
