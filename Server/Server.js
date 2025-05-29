import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// if ((process.env.NODE_ENV = "development")) {
//   db.sync({ alter: true });
// }

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
