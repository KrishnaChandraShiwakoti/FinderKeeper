import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Images = db.define(
  "images",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Images;
