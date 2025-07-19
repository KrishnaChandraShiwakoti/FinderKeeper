import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminStats from '../Components/AdminStats';
import AdminRecentActivity from '../Components/AdminRecentActivity';
import AdminListingManagement from '../Components/AdminListingManagement';
import AdminUserManagement from '../Components/AdminUserManagement';
import '../Styles/AdminDashboard.css';
import '../Styles/AdminManagement.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            {dashboardData && (
              <>
                <AdminStats stats={dashboardData.dashboardStats} />
                <div className="dashboard-grid">
                  <AdminRecentActivity activities={dashboardData.recentActivity} />
                  <div className="top-categories-card">
                    <h3>Top Categories</h3>
                    <div className="categories-list">
                      {dashboardData.topCategories.map((category, index) => (
                        <div key={index} className="category-item">
                          <span className="category-name">{category.name}</span>
                          <span className="category-stats">
                            {category.listings} listings | ${category.revenue.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        );
      case 'listings':
        return <AdminListingManagement />;
      case 'users':
        return <AdminUserManagement />;
      case 'transactions':
        return (
          <div className="coming-soon">
            <h2>Transaction Management</h2>
            <p>Transaction management features coming soon...</p>
          </div>
        );
      case 'reviews':
        return (
          <div className="coming-soon">
            <h2>Review Moderation</h2>
            <p>Review moderation features coming soon...</p>
          </div>
        );
      case 'categories':
        return (
          <div className="coming-soon">
            <h2>Category Management</h2>
            <p>Category management features coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="coming-soon">
            <h2>Analytics</h2>
            <p>Analytics dashboard coming soon...</p>
          </div>
        );
      case 'security':
        return (
          <div className="coming-soon">
            <h2>Security</h2>
            <p>Security management features coming soon...</p>
          </div>
        );
      default:
        return <div>Section not found</div>;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />
      
      <div className="admin-main-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, Administrator</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
        
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
