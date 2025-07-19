import express from "express";
import {
  adminLogin,
  getDashboardStats,
  getPendingListings,
  updateListingStatus,
  getAllUsers,
  toggleUserBlock,
  getAllTransactions,
  getPendingReviews,
  moderateReview,
  getCategories,
  manageCategory
} from "../controllers/adminController.js";
import { verifyAdminToken, checkPermission } from "../middleware/verifyAdminToken.js";

const router = express.Router();

// Authentication
router.post("/login", adminLogin);

// Dashboard
router.get("/dashboard/stats", verifyAdminToken, getDashboardStats);

// Listing Management
router.get("/listings/pending", verifyAdminToken, checkPermission('canApproveItems'), getPendingListings);
router.put("/listings/:itemId/status", verifyAdminToken, checkPermission('canApproveItems'), updateListingStatus);

// User Management
router.get("/users", verifyAdminToken, checkPermission('canBlockUsers'), getAllUsers);
router.put("/users/:userId/block", verifyAdminToken, checkPermission('canBlockUsers'), toggleUserBlock);

// Transaction Management  
router.get("/transactions", verifyAdminToken, checkPermission('canViewTransactions'), getAllTransactions);

// Review Moderation
router.get("/reviews/pending", verifyAdminToken, checkPermission('canModerateReviews'), getPendingReviews);
router.put("/reviews/:reviewId/moderate", verifyAdminToken, checkPermission('canModerateReviews'), moderateReview);

// Category Management
router.get("/categories", verifyAdminToken, checkPermission('canManageCategories'), getCategories);
router.post("/categories", verifyAdminToken, checkPermission('canManageCategories'), manageCategory);
router.put("/categories/:categoryId", verifyAdminToken, checkPermission('canManageCategories'), manageCategory);

export default router;
