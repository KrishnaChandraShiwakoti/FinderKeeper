import db from "../config/db";
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
  otp: DataTypes.STRING,
  otpExpiry: DataTypes.DATE,
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default User;
