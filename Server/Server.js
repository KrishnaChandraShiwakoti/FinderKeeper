import express from "express";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import "./model/index.js";
import { authRoutes, ItemRoutes, adminRoutes } from "./routes/index.js";
import { authRoutes, ItemRoutes, UserRoutes } from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

// if ((process.env.NODE_ENV = "development")) {
//   db.sync({ alter: true });
// }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/item", ItemRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", UserRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
