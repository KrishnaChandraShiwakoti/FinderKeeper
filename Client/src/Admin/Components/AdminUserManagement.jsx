import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEye,
  FaBan,
  FaUnlock
} from 'react-icons/fa';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${selectedUser.id}/block`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: actionType,
          reason: reason
        })
      });

      const data = await response.json();
      if (data.success) {
        // Update user status in local state
        setUsers(prev => 
          prev.map(user => 
            user.id === selectedUser.id 
              ? { ...user, isBlocked: actionType === 'block', blockedReason: reason }
              : user
          )
        );
        setShowModal(false);
        setReason('');
        alert(`User ${actionType}ed successfully!`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error updating user status');
    }
  };

  const openActionModal = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && !user.isBlocked && user.isVerified) ||
                         (statusFilter === 'blocked' && user.isBlocked) ||
                         (statusFilter === 'unverified' && !user.isVerified);
    
    return matchesSearch && matchesStatus;
  });

  const getUserAvatar = (fullname) => {
    return fullname.charAt(0).toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getLastLoginText = (lastLogin) => {
    if (!lastLogin) return 'Never';
    const now = new Date();
    const loginDate = new Date(lastLogin);
    const diffInDays = Math.floor((now - loginDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(lastLogin);
  };

  if (loading) {
    return <div className="admin-loading">Loading users...</div>;
  }

  return (
    <div className="admin-user-management">
      <div className="section-header">
        <h2>User Management</h2>
        <p>Manage user accounts, block fraudulent users, and monitor activity</p>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="blocked">Blocked Users</option>
            <option value="unverified">Unverified Users</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Activity</th>
              <th>Last Login</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={user.isBlocked ? 'blocked-user' : ''}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {getUserAvatar(user.fullname)}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.fullname}</div>
                      <div className="user-role">{user.role}</div>
                    </div>
                  </div>
                </td>
                
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>{user.email}</span>
                    </div>
                    {user.phoneNumber && (
                      <div className="contact-item">
                        <FaPhone />
                        <span>{user.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </td>
                
                <td>
                  <div className="status-badges">
                    {user.isBlocked ? (
                      <span className="status-badge blocked">Blocked</span>
                    ) : user.isVerified ? (
                      <span className="status-badge active">Active</span>
                    ) : (
                      <span className="status-badge unverified">Unverified</span>
                    )}
                  </div>
                </td>
                
                <td>
                  <div className="activity-stats">
                    <div>{user.totalTransactions} transactions</div>
                    <div>{user.totalListings} listings</div>
                  </div>
                </td>
                
                <td>
                  <div className="last-login">
                    {getLastLoginText(user.lastLoginAt)}
                  </div>
                </td>
                
                <td>
                  <div className="join-date">
                    <FaCalendarAlt />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </td>
                
                <td>
                  <div className="user-actions">
                    <button className="action-btn view">
                      <FaEye />
                      View
                    </button>
                    {user.isBlocked ? (
                      <button 
                        className="action-btn unblock"
                        onClick={() => openActionModal(user, 'unblock')}
                      >
                        <FaUnlock />
                        Unblock
                      </button>
                    ) : (
                      <button 
                        className="action-btn block"
                        onClick={() => openActionModal(user, 'block')}
                      >
                        <FaBan />
                        Block
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-users">
          <p>No users found matching your criteria</p>
        </div>
      )}

      {/* Action Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="action-modal">
            <h3>
              {actionType === 'block' ? 'Block' : 'Unblock'} User
            </h3>
            <p>
              Are you sure you want to {actionType} user "{selectedUser?.fullname}"?
            </p>
            
            {selectedUser?.isBlocked && actionType === 'unblock' && (
              <div className="current-reason">
                <strong>Current Block Reason:</strong>
                <p>{selectedUser.blockedReason || 'No reason provided'}</p>
              </div>
            )}
            
            {actionType === 'block' && (
              <div className="form-group">
                <label>Reason for blocking:</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a detailed reason for blocking this user..."
                  required
                />
              </div>
            )}
            
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => {
                  setShowModal(false);
                  setReason('');
                }}
              >
                Cancel
              </button>
              <button 
                className={`btn-confirm ${actionType}`}
                onClick={handleUserAction}
                disabled={actionType === 'block' && !reason.trim()}
              >
                {actionType === 'block' ? 'Block User' : 'Unblock User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
