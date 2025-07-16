import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Items = db.define("items", {
  itemId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM,
    values: ["false", "true"],
  },
  imageId: {
    type: DataTypes.INTEGER,
    references: {
      model: "images",
      key: "id",
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: "categories",
      key: "categoryId",
    },
  },
});

export default Items;
