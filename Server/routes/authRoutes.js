import express from "express";
import { addUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", addUser);

export default router;
