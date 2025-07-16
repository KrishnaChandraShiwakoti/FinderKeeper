import express from "express";
import { postItem } from "../controllers/itemsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, postItem);

export default router;
