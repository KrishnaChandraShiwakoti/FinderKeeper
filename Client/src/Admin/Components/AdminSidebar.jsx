import React from 'react';
import { 
  FaHome, 
  FaClipboardList, 
  FaUsers, 
  FaExchangeAlt, 
  FaStar, 
  FaTags, 
  FaSignOutAlt,
  FaChartBar,
  FaShieldAlt 
} from 'react-icons/fa';

const AdminSidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { id: 'listings', icon: FaClipboardList, label: 'Manage Listings' },
    { id: 'users', icon: FaUsers, label: 'User Management' },
    { id: 'transactions', icon: FaExchangeAlt, label: 'Transactions' },
    { id: 'reviews', icon: FaStar, label: 'Review Moderation' },
    { id: 'categories', icon: FaTags, label: 'Categories' },
    { id: 'analytics', icon: FaChartBar, label: 'Analytics' },
    { id: 'security', icon: FaShieldAlt, label: 'Security' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>FinderKeeper</h2>
        <span className="admin-badge">Admin Panel</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-sidebar-btn" onClick={onLogout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
