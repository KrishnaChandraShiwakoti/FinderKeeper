import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.id = decoded.id;
    next();
  });
};
