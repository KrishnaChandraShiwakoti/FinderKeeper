import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Transaction = db.define("Transaction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  buyerId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users", 
      key: "id",
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    references: {
      model: "items",
      key: "itemId",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["pending", "completed", "failed", "refunded", "cancelled"],
    defaultValue: "pending",
  },
  paymentMethod: {
    type: DataTypes.ENUM,
    values: ["credit_card", "debit_card", "paypal", "bank_transfer", "wallet"],
    defaultValue: "credit_card",
  },
  exchangeValue: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  finalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transactionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

export default Transaction;
