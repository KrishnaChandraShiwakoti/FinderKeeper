import { useState } from 'react';
import './UpdateProfile.css';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    location: '',
    firstName: '',
    lastName: '',
    workNumber: '',
    mobileNumber: '',
    email: '',
    workAddress: '',
    currentPassword: '',
    newPassword: '',
    makePublic: false
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated!');
  };

  const handleReset = () => {
    setFormData({
      location: '',
      firstName: '',
      lastName: '',
      workNumber: '',
      mobileNumber: '',
      email: '',
      workAddress: '',
      currentPassword: '',
      newPassword: '',
      makePublic: false
    });
    setProfilePic(null);
  };

  return (
    <div className="profile-bg">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-picture-section">
          <label htmlFor="profilePicInput" className="profile-picture-label">
            <img
              src={profilePic || "https://bootdey.com/img/Content/avatar/avatar6.png"}
              alt="User avatar"
              className="profile-picture"
            />
            <span className="profile-picture-change-text">Change Photo</span>
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
          </label>
        </div>
        {/* User Info */}
        <div className="profile-card">
          <h3 className="profile-card-title">User info</h3>
          <div className="profile-row">
            <label>Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="profile-input"
            >
              <option value="">Select country</option>
              <option value="Belgium">Belgium</option>
              <option value="Canada">Canada</option>
              <option value="Denmark">Denmark</option>
              <option value="Estonia">Estonia</option>
              <option value="France">France</option>
            </select>
          </div>
          <div className="profile-row">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div className="profile-row">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="profile-card">
          <h3 className="profile-card-title">Contact info</h3>
          <div className="profile-row">
            <label>Mobile number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div className="profile-row">
            <label>E-mail address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="profile-input"
            />
          </div>  
        </div>

        {/* Security */}
        <div className="profile-card">
          <h3 className="profile-card-title">Security</h3>
          <div className="profile-row">
            <label>Current password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div className="profile-row">
            <label>New password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div className="profile-row profile-checkbox-row">
            <input
              type="checkbox"
              id="makePublic"
              name="makePublic"
              checked={formData.makePublic}
              onChange={handleChange}
            />
            <label htmlFor="makePublic" className="profile-checkbox-label">
              Save Change
            </label>
          </div>
        </div>

        <div className="profile-actions">
          <button type="submit" className="profile-btn profile-btn-primary">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="profile-btn profile-btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

