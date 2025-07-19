import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye, FaClock, FaUser, FaMapMarkerAlt } from 'react-icons/fa';

const AdminListingManagement = () => {
  const [pendingListings, setPendingListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchPendingListings();
  }, []);

  const fetchPendingListings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/listings/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setPendingListings(data.data);
      }
    } catch (error) {
      console.error('Error fetching pending listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedListing || !actionType) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/listings/${selectedListing.itemId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: actionType,
          reason: reason
        })
      });

      const data = await response.json();
      if (data.success) {
        // Remove from pending list
        setPendingListings(prev => 
          prev.filter(listing => listing.itemId !== selectedListing.itemId)
        );
        setShowModal(false);
        setReason('');
        alert(`Listing ${actionType} successfully!`);
      }
    } catch (error) {
      console.error('Error updating listing status:', error);
      alert('Error updating listing status');
    }
  };

  const openActionModal = (listing, action) => {
    setSelectedListing(listing);
    setActionType(action);
    setShowModal(true);
  };

  if (loading) {
    return <div className="admin-loading">Loading pending listings...</div>;
  }

  return (
    <div className="admin-listing-management">
      <div className="section-header">
        <h2>Pending Listings Management</h2>
        <p>Review and approve/reject new listings</p>
      </div>

      <div className="listings-grid">
        {pendingListings.map((listing) => (
          <div key={listing.itemId} className="listing-card">
            <div className="listing-image">
              <img 
                src={listing.image?.url || '/placeholder-image.jpg'} 
                alt={listing.name}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <div className="listing-status">
                <FaClock />
                <span>Pending</span>
              </div>
            </div>
            
            <div className="listing-content">
              <h3>{listing.name}</h3>
              <p className="listing-description">{listing.description}</p>
              
              <div className="listing-details">
                <div className="detail-item">
                  <strong>Price:</strong> ${listing.price?.toLocaleString() || 'N/A'}
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{listing.location}</span>
                </div>
                <div className="detail-item">
                  <FaUser />
                  <span>{listing.user?.fullname}</span>
                </div>
                <div className="detail-item">
                  <strong>Category:</strong> {listing.category?.name}
                </div>
                <div className="detail-item">
                  <strong>Listed:</strong> {new Date(listing.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="listing-actions">
                <button 
                  className="action-btn approve"
                  onClick={() => openActionModal(listing, 'approved')}
                >
                  <FaCheck />
                  Approve
                </button>
                <button 
                  className="action-btn reject"
                  onClick={() => openActionModal(listing, 'rejected')}
                >
                  <FaTimes />
                  Reject
                </button>
                <button className="action-btn view">
                  <FaEye />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingListings.length === 0 && (
        <div className="no-listings">
          <p>No pending listings to review</p>
        </div>
      )}

      {/* Action Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="action-modal">
            <h3>
              {actionType === 'approved' ? 'Approve' : 'Reject'} Listing
            </h3>
            <p>
              Are you sure you want to {actionType === 'approved' ? 'approve' : 'reject'} 
              "{selectedListing?.name}"?
            </p>
            
            {actionType === 'rejected' && (
              <div className="form-group">
                <label>Reason for rejection:</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
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
                onClick={handleAction}
                disabled={actionType === 'rejected' && !reason.trim()}
              >
                {actionType === 'approved' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListingManagement;
