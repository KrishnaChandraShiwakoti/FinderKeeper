import db from "../config/db.js";
import { DataTypes } from "sequelize";

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.BIGINT,
  },
  otp: DataTypes.STRING,
  otpExpiry: DataTypes.DATE,
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  blockedReason: {
    type: DataTypes.TEXT,
  },
  blockedAt: {
    type: DataTypes.DATE,
  },
  lastLoginAt: {
    type: DataTypes.DATE,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["user", "premium_user"],
    defaultValue: "user",
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  totalTransactions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalListings: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default User;
