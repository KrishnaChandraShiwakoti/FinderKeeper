import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Review = db.define("Review", {
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
  itemId: {
    type: DataTypes.INTEGER,
    references: {
      model: "items", 
      key: "itemId",
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["pending", "approved", "rejected", "hidden"],
    defaultValue: "pending",
  },
  moderatedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: "Admins",
      key: "id",
    },
  },
  moderationReason: {
    type: DataTypes.TEXT,
  },
  isVerifiedPurchase: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Review;
