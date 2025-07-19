import express from "express";
import {
  changeClaimedStatus,
  deletePost,
  getAll,
  getItemById,
  getItemsByUser,
  getRecentItem,
  postItem,
} from "../controllers/itemsController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import multer from "multer";

import storage from "../middleware/multerStorage.js";
const upload = multer({ storage });

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), postItem);
router.delete("/:id", verifyToken, deletePost);
router.get("/user/:id", verifyToken, getItemsByUser);
router.get("/", getAll);
router.get("/recent", getRecentItem);
router.get("/:id", getItemById);
router.put("/:id", verifyToken, changeClaimedStatus);

export default router;
