// src/app.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env file from utils/.env
dotenv.config({
  path: path.resolve(__dirname, "../utils/.env"),
  debug: true,
});

// Debug check
console.log("🔍 ENV MONGO_URL:", process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 8000;
const mongoURL = process.env.MONGO_URL;

app.set("port", PORT);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const server = createServer(app);
const io = connectToSocket(server);

const start = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

start();
