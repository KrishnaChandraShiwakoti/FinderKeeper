import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Profile.css";

// Simulate user data from localStorage (replace with real API in production)
const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234 567 8901",
      joined: "2024-01-15",
      location: "New York, USA",
    };
  } catch {
    return {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234 567 8901",
      joined: "2024-01-15",
      location: "New York, USA",
    };
  }
};

const Profile = () => {
  const user = getUser();
  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <FaUserCircle size={90} />
      </div>
      <div className="profile-name">{user.name}</div>
      <div className="profile-email">{user.email}</div>
      <div className="profile-info">
        <div className="profile-info-row">
          <span>Phone</span>
          <span>{user.phone}</span>
        </div>
        <div className="profile-info-row">
          <span>Location</span>
          <span>{user.location}</span>
        </div>
        <div className="profile-info-row">
          <span>Joined</span>
          <span>{user.joined}</span>
        </div>
      </div>
      <div className="profile-actions">
        <button className="profile-btn">Edit Profile</button>
        <button className="profile-btn" style={{ background: "#e53935" }}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
