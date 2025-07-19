import db from "../config/db.js";
import { DataTypes } from "sequelize";

const UserActivity = db.define("UserActivity", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.JSON,
  },
  ipAddress: {
    type: DataTypes.STRING,
  },
  userAgent: {
    type: DataTypes.TEXT,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const BlockedUser = db.define("BlockedUser", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  blockedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: "Admins",
      key: "id",
    },
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blockedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  unblockedAt: {
    type: DataTypes.DATE,
  },
});

export { UserActivity, BlockedUser };
