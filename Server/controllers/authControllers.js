import { sql } from "../../../coding/FullStack/NewsFest/Server/config/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const addUser = async (req, res) => {
  const { name, email, password } = req.body.formData;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log("Error hashing password", err);
    } else {
      console.log(hash);
    }
  });
};
