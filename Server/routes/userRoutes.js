import express from "express";
import {
  changePassword,
  deleteAccount,
  getUserInfo,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:email", verifyToken, getUserInfo);
router.delete("/:id", verifyToken, deleteAccount);
router.put("/:id", verifyToken, updateUser);
router.put("/password/:id", verifyToken, changePassword);

export default router;
