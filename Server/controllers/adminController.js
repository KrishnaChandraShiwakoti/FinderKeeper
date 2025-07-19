import Admin from "../model/admin.js";
import User from "../model/user.js";
import Items from "../model/items.js";
import Transaction from "../model/transaction.js";
import Review from "../model/review.js";
import { BlockedUser, UserActivity } from "../model/userActivity.js";
import Category from "../model/category.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock Data for Development
const generateMockData = () => {
  return {
    dashboardStats: {
      totalUsers: 1248,
      activeUsers: 892,
      blockedUsers: 15,
      totalListings: 3456,
      pendingApprovals: 23,
      approvedListings: 3201,
      rejectedListings: 232,
      totalTransactions: 2103,
      totalRevenue: 142890.50,
      monthlyRevenue: 18450.75,
      totalReviews: 1876,
      pendingReviews: 12,
      flaggedReviews: 5,
    },
    recentActivity: [
      { id: 1, type: "user_registration", user: "John Doe", timestamp: "2025-01-19T10:30:00Z", details: "New user registered" },
      { id: 2, type: "item_listed", user: "Jane Smith", timestamp: "2025-01-19T10:25:00Z", details: "iPhone 15 Pro listed for $899" },
      { id: 3, type: "transaction_completed", user: "Mike Johnson", timestamp: "2025-01-19T10:20:00Z", details: "Purchase completed - $1,299" },
      { id: 4, type: "review_flagged", user: "Sarah Wilson", timestamp: "2025-01-19T10:15:00Z", details: "Review flagged as inappropriate" },
      { id: 5, type: "user_blocked", user: "Admin", timestamp: "2025-01-19T10:10:00Z", details: "User blocked for fraudulent activity" },
    ],
    topCategories: [
      { name: "Electronics", listings: 1245, revenue: 89420.50 },
      { name: "Vehicles", listings: 892, revenue: 156780.00 },
      { name: "Fashion", listings: 567, revenue: 23450.75 },
      { name: "Home & Garden", listings: 234, revenue: 12890.25 },
      { name: "Sports", listings: 156, revenue: 8450.00 },
    ]
  };
};

// Admin Authentication
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // For development - use mock admin credentials
    if (username === "admin" && password === "admin123") {
      const token = jwt.sign(
        { 
          id: 1, 
          username: "admin", 
          role: "super_admin",
          email: "admin@finderkeeper.com"
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.EXPIRES_IN }
      );

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        admin: {
          id: 1,
          username: "admin",
          email: "admin@finderkeeper.com",
          role: "super_admin",
          fullname: "System Administrator",
          permissions: {
            canApproveItems: true,
            canBlockUsers: true,
            canViewTransactions: true,
            canManageCategories: true,
            canModerateReviews: true,
          }
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials"
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const mockData = generateMockData();
    
    res.status(200).json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats"
    });
  }
};

// Pending Listings Management
export const getPendingListings = async (req, res) => {
  try {
    const mockPendingListings = [
      {
        itemId: 1,
        name: "iPhone 15 Pro Max",
        description: "Brand new iPhone 15 Pro Max, 256GB, Space Black",
        price: 1199.99,
        location: "New York, NY",
        user: { id: 1, fullname: "John Doe", email: "john@example.com" },
        category: { name: "Electronics" },
        image: { url: "/uploads/iphone15pro.jpg" },
        createdAt: "2025-01-19T08:30:00Z",
        status: "pending"
      },
      {
        itemId: 2,
        name: "MacBook Pro 14-inch",
        description: "M3 MacBook Pro, 16GB RAM, 512GB SSD",
        price: 2299.99,
        location: "Los Angeles, CA",
        user: { id: 2, fullname: "Jane Smith", email: "jane@example.com" },
        category: { name: "Electronics" },
        image: { url: "/uploads/macbook.jpg" },
        createdAt: "2025-01-19T07:45:00Z",
        status: "pending"
      },
      {
        itemId: 3,
        name: "Toyota Camry 2023",
        description: "Low mileage, excellent condition",
        price: 28999.99,
        location: "Chicago, IL",
        user: { id: 3, fullname: "Mike Johnson", email: "mike@example.com" },
        category: { name: "Vehicles" },
        image: { url: "/uploads/camry.jpg" },
        createdAt: "2025-01-19T06:20:00Z",
        status: "pending"
      }
    ];

    res.status(200).json({
      success: true,
      data: mockPendingListings,
      total: mockPendingListings.length
    });
  } catch (error) {
    console.error("Get pending listings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending listings"
    });
  }
};

// Approve/Reject Listings
export const updateListingStatus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { status, reason } = req.body;

    // Mock response for development
    res.status(200).json({
      success: true,
      message: `Listing ${status} successfully`,
      data: {
        itemId: parseInt(itemId),
        status,
        reason,
        approvedBy: req.admin.id,
        approvedAt: new Date()
      }
    });
  } catch (error) {
    console.error("Update listing status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update listing status"
    });
  }
};

// User Management
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    
    const mockUsers = [
      {
        id: 1,
        fullname: "John Doe",
        email: "john@example.com",
        phoneNumber: "+1-555-0123",
        isVerified: true,
        isBlocked: false,
        totalTransactions: 15,
        totalListings: 8,
        lastLoginAt: "2025-01-19T09:30:00Z",
        createdAt: "2024-12-01T10:00:00Z",
        role: "user"
      },
      {
        id: 2,
        fullname: "Jane Smith", 
        email: "jane@example.com",
        phoneNumber: "+1-555-0124",
        isVerified: true,
        isBlocked: false,
        totalTransactions: 22,
        totalListings: 12,
        lastLoginAt: "2025-01-19T08:45:00Z",
        createdAt: "2024-11-15T14:30:00Z",
        role: "premium_user"
      },
      {
        id: 3,
        fullname: "Mike Johnson",
        email: "mike@example.com",
        phoneNumber: "+1-555-0125", 
        isVerified: false,
        isBlocked: true,
        totalTransactions: 3,
        totalListings: 2,
        lastLoginAt: "2025-01-18T16:20:00Z",
        createdAt: "2024-10-20T11:15:00Z",
        role: "user",
        blockedReason: "Fraudulent activity detected"
      }
    ];

    res.status(200).json({
      success: true,
      data: mockUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(mockUsers.length / limit),
        totalUsers: mockUsers.length,
        hasNext: false,
        hasPrev: false
      }
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

// Block/Unblock User
export const toggleUserBlock = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason, action } = req.body; // action: 'block' or 'unblock'

    res.status(200).json({
      success: true,
      message: `User ${action}ed successfully`,
      data: {
        userId: parseInt(userId),
        action,
        reason,
        actionBy: req.admin.id,
        actionAt: new Date()
      }
    });
  } catch (error) {
    console.error("Toggle user block error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status"
    });
  }
};

// Transaction Management
export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, dateFrom, dateTo } = req.query;
    
    const mockTransactions = [
      {
        id: 1,
        transactionId: "TXN001234567",
        buyer: { id: 1, fullname: "John Doe", email: "john@example.com" },
        seller: { id: 2, fullname: "Jane Smith", email: "jane@example.com" },
        item: { name: "iPhone 15 Pro", itemId: 101 },
        amount: 1199.99,
        exchangeValue: 200.00,
        finalAmount: 999.99,
        status: "completed",
        paymentMethod: "credit_card",
        transactionDate: "2025-01-19T10:30:00Z"
      },
      {
        id: 2,
        transactionId: "TXN001234568",
        buyer: { id: 3, fullname: "Mike Johnson", email: "mike@example.com" },
        seller: { id: 1, fullname: "John Doe", email: "john@example.com" },
        item: { name: "MacBook Pro", itemId: 102 },
        amount: 2299.99,
        exchangeValue: 0,
        finalAmount: 2299.99,
        status: "pending",
        paymentMethod: "paypal",
        transactionDate: "2025-01-19T09:15:00Z"
      }
    ];

    res.status(200).json({
      success: true,
      data: mockTransactions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(mockTransactions.length / limit),
        totalTransactions: mockTransactions.length
      }
    });
  } catch (error) {
    console.error("Get all transactions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions"
    });
  }
};

// Review Moderation
export const getPendingReviews = async (req, res) => {
  try {
    const mockPendingReviews = [
      {
        id: 1,
        user: { id: 1, fullname: "John Doe" },
        item: { itemId: 101, name: "iPhone 15 Pro" },
        rating: 5,
        comment: "Excellent product, fast delivery!",
        status: "pending",
        isVerifiedPurchase: true,
        createdAt: "2025-01-19T08:30:00Z"
      },
      {
        id: 2,
        user: { id: 2, fullname: "Jane Smith" },
        item: { itemId: 102, name: "MacBook Pro" },
        rating: 2,
        comment: "This is terrible quality, worst purchase ever made!",
        status: "pending",
        isVerifiedPurchase: false,
        createdAt: "2025-01-19T07:45:00Z"
      }
    ];

    res.status(200).json({
      success: true,
      data: mockPendingReviews,
      total: mockPendingReviews.length
    });
  } catch (error) {
    console.error("Get pending reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending reviews"
    });
  }
};

// Moderate Review
export const moderateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { action, reason } = req.body; // action: 'approve', 'reject', 'hide'

    res.status(200).json({
      success: true,
      message: `Review ${action}d successfully`,
      data: {
        reviewId: parseInt(reviewId),
        action,
        reason,
        moderatedBy: req.admin.id,
        moderatedAt: new Date()
      }
    });
  } catch (error) {
    console.error("Moderate review error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to moderate review"
    });
  }
};

// Category Management
export const getCategories = async (req, res) => {
  try {
    const mockCategories = [
      { categoryId: 1, name: "Electronics", isActive: true, totalListings: 1245, createdAt: "2024-01-01T00:00:00Z" },
      { categoryId: 2, name: "Vehicles", isActive: true, totalListings: 892, createdAt: "2024-01-01T00:00:00Z" },
      { categoryId: 3, name: "Fashion", isActive: true, totalListings: 567, createdAt: "2024-01-01T00:00:00Z" },
      { categoryId: 4, name: "Home & Garden", isActive: true, totalListings: 234, createdAt: "2024-01-01T00:00:00Z" },
      { categoryId: 5, name: "Sports", isActive: false, totalListings: 156, createdAt: "2024-01-01T00:00:00Z" },
    ];

    res.status(200).json({
      success: true,
      data: mockCategories
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
};

// Add/Update Category
export const manageCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, isActive } = req.body;
    const isUpdate = !!categoryId;

    res.status(200).json({
      success: true,
      message: `Category ${isUpdate ? 'updated' : 'created'} successfully`,
      data: {
        categoryId: isUpdate ? parseInt(categoryId) : Date.now(),
        name,
        isActive: isActive !== undefined ? isActive : true,
        [isUpdate ? 'updatedAt' : 'createdAt']: new Date()
      }
    });
  } catch (error) {
    console.error("Manage category error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to ${categoryId ? 'update' : 'create'} category`
    });
  }
};
