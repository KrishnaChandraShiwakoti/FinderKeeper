// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import path from "path";
import { fileURLToPath } from "url";
import "./model/index.js";
import { authRoutes, ItemRoutes, UserRoutes } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/item", ItemRoutes);
app.use("/api/user", UserRoutes);

export default app;
