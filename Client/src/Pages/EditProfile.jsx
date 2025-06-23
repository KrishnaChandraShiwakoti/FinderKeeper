import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/EditProfile.css";
import { auth } from "../Utlis/axios";

const countries = ["Nepal", "India", "USA", "UK", "Canada", "Australia"];

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+977-9876543210",
    country: "Nepal",
    bio: "Software Developer passionate about mobile apps",
    profileImage: null,
    profileImageUrl: "https://via.placeholder.com/100x100?text=Profile", // Placeholder
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        profileImage: file,
        profileImageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "profileImageUrl") return;
      formData.append(key, value);
    });
    try {
      await auth.post("/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Show success, redirect, etc.
      navigate("/profile");
    } catch (err) {
      // Handle error
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-bg">
      <form className="edit-profile-container" onSubmit={handleSubmit}>
        <h2 className="edit-profile-title">Edit Profile</h2>
        <div className="profile-image-section">
          <img
            src={form.profileImageUrl}
            alt="Profile"
            className="profile-image"
          />
          <label htmlFor="profileImage" className="edit-image-label">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#e0e0e0" />
              <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div className="edit-profile-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/profile")}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile; 