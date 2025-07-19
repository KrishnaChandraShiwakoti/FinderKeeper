import User from "./user.js";
import Image from "./image.js";
import Items from "./items.js";
import Category from "./category.js";
import Admin from "./admin.js";
import Transaction from "./transaction.js";
import Review from "./review.js";
import { UserActivity, BlockedUser } from "./userActivity.js";

// Existing associations
Items.belongsTo(Image, { foreignKey: "imageId", as: "image" });
Items.belongsTo(User, { foreignKey: "userId", as: "user" });
Items.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Items.belongsTo(Admin, { foreignKey: "approvedBy", as: "approver" });

// User associations
User.hasMany(Items, { foreignKey: "userId", as: "items" });
User.hasMany(Transaction, { foreignKey: "buyerId", as: "purchases" });
User.hasMany(Transaction, { foreignKey: "sellerId", as: "sales" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
User.hasMany(UserActivity, { foreignKey: "userId", as: "activities" });

// Admin associations
Admin.hasMany(Items, { foreignKey: "approvedBy", as: "approvedItems" });
Admin.hasMany(Review, { foreignKey: "moderatedBy", as: "moderatedReviews" });
Admin.hasMany(BlockedUser, { foreignKey: "blockedBy", as: "blockedUsers" });

// Transaction associations
Transaction.belongsTo(User, { foreignKey: "buyerId", as: "buyer" });
Transaction.belongsTo(User, { foreignKey: "sellerId", as: "seller" });
Transaction.belongsTo(Items, { foreignKey: "itemId", as: "item" });

// Review associations
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Items, { foreignKey: "itemId", as: "item" });
Review.belongsTo(Admin, { foreignKey: "moderatedBy", as: "moderator" });

// User Activity associations
UserActivity.belongsTo(User, { foreignKey: "userId", as: "user" });

// Blocked User associations
BlockedUser.belongsTo(User, { foreignKey: "userId", as: "user" });
BlockedUser.belongsTo(Admin, { foreignKey: "blockedBy", as: "admin" });
