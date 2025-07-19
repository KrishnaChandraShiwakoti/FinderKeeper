import React from 'react';
import { 
  FaUsers, 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaStar,
  FaUserShield,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: FaUsers,
      color: 'blue',
      subtext: `${stats.activeUsers} active`
    },
    {
      title: 'Total Listings',
      value: stats.totalListings.toLocaleString(),
      icon: FaClipboardList,
      color: 'green',
      subtext: `${stats.pendingApprovals} pending approval`
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FaMoneyBillWave,
      color: 'purple',
      subtext: `$${stats.monthlyRevenue.toLocaleString()} this month`
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews.toLocaleString(),
      icon: FaStar,
      color: 'orange',
      subtext: `${stats.pendingReviews} pending moderation`
    }
  ];

  const quickStats = [
    { label: 'Approved Listings', value: stats.approvedListings, icon: FaCheckCircle, color: 'green' },
    { label: 'Rejected Listings', value: stats.rejectedListings, icon: FaTimesCircle, color: 'red' },
    { label: 'Blocked Users', value: stats.blockedUsers, icon: FaUserShield, color: 'red' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: FaClock, color: 'orange' }
  ];

  return (
    <div className="admin-stats">
      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <Icon />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
                <span className="stat-subtext">{stat.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="quick-stats">
        <h3>Quick Overview</h3>
        <div className="quick-stats-grid">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="quick-stat-item">
                <Icon className={`quick-stat-icon ${stat.color}`} />
                <div>
                  <span className="quick-stat-value">{stat.value.toLocaleString()}</span>
                  <span className="quick-stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
