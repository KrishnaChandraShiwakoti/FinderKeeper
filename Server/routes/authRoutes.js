import express from "express";
import {
  addUser,
  login,
  resetPassword,
  sendOtps,
  verifyOtp,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/register/verify", verifyOtp);
router.post("/login", login);
router.post("/send-otp", sendOtps);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
export default router;
