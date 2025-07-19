import jwt from "jsonwebtoken";

export const verifyAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided or invalid format."
      });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Check if the user is an admin
    if (!decoded.role || !['admin', 'super_admin', 'moderator'].includes(decoded.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Token verification failed."
    });
  }
};

export const checkPermission = (permission) => {
  return (req, res, next) => {
    try {
      // For mock implementation, super_admin has all permissions
      if (req.admin.role === 'super_admin') {
        return next();
      }
      
      // Check specific permissions based on role
      const rolePermissions = {
        admin: {
          canApproveItems: true,
          canBlockUsers: true,
          canViewTransactions: true,
          canManageCategories: true,
          canModerateReviews: true,
        },
        moderator: {
          canApproveItems: true,
          canBlockUsers: false,
          canViewTransactions: false,
          canManageCategories: false,
          canModerateReviews: true,
        }
      };

      const userPermissions = rolePermissions[req.admin.role] || {};
      
      if (!userPermissions[permission]) {
        return res.status(403).json({
          success: false,
          message: `Access denied. ${permission} permission required.`
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Permission check failed."
      });
    }
  };
};
