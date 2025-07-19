import React from 'react';
import { 
  FaUserPlus, 
  FaClipboardList, 
  FaShoppingCart, 
  FaFlag,
  FaUserTimes,
  FaClock
} from 'react-icons/fa';

const AdminRecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return FaUserPlus;
      case 'item_listed':
        return FaClipboardList;
      case 'transaction_completed':
        return FaShoppingCart;
      case 'review_flagged':
        return FaFlag;
      case 'user_blocked':
        return FaUserTimes;
      default:
        return FaClock;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_registration':
        return 'green';
      case 'item_listed':
        return 'blue';
      case 'transaction_completed':
        return 'purple';
      case 'review_flagged':
        return 'orange';
      case 'user_blocked':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="admin-recent-activity">
      <h3>Recent Activity</h3>
      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${color}`}>
                <Icon />
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-time">{formatTime(activity.timestamp)}</span>
                </div>
                <p className="activity-details">{activity.details}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="view-all-activity">
        View All Activity
      </button>
    </div>
  );
};

export default AdminRecentActivity;
