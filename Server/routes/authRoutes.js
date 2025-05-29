import express from "express";
import { addUser, login, verifyOtp } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/register/verify", verifyOtp);
router.post("/login", login);

export default router;
