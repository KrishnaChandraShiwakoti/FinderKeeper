import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Admin = db.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  role: {
    type: DataTypes.ENUM,
    values: ["super_admin", "admin", "moderator"],
    defaultValue: "admin",
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
  permissions: {
    type: DataTypes.JSON,
    defaultValue: {
      canApproveItems: true,
      canBlockUsers: true,
      canViewTransactions: true,
      canManageCategories: true,
      canModerateReviews: true,
    },
  },
});

export default Admin;
