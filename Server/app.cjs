const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: ".env" });
require("./model/index.js");
const { authRoutes, ItemRoutes, UserRoutes } = require("./routes/index.js");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/item", ItemRoutes);
app.use("/api/user", UserRoutes);

module.exports = app;
