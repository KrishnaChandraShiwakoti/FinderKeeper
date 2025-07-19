import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/ReportItem.css";
import { items } from "../Utlis/axios";
import { toast } from "react-toastify";

const categories = [
  "Electronics",
  "Jewelry",
  "Clothing",
  "Documents",
  "Bags",
  "Keys",
  "Other",
];

const ReportItem = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    status: false,
    name: "",
    description: "",
    category: "",
    dateLost: "",
    location: "",
    email: "",
    claimed: "",
  });

  // Claimed options based on status
  const claimedOptions = form.status
    ? ["StillMissing", "Found"]
    : ["NotClaimed", "Claimed"];
  const user = JSON.parse(localStorage.getItem("user"));
  const BEARER_TOKEN = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("dateLost", form.dateLost);
    formData.append("location", form.location);
    formData.append("email", form.email);
    formData.append("userId", user.user_id);
    formData.append("claimed", form.claimed);
    if (image) {
      formData.append("image", image);
    }
    try {
      const res = await items.post("/", formData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error uploading item");
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="report-bg">
      <form className="report-container" onSubmit={handleSubmit}>
        <div className="report-back">
          <Link to="/" className="back-link">
            &lt; Back to Home
          </Link>
        </div>
        <h2 className="report-title">Report an Item</h2>

        <div className="form-group">
          <label className="status-label-main">Item Status</label>
          <div className="status-group">
            <label className="switch">
              <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
            <span className="status-label">Lost Item</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="claimed">Claimed Status</label>
          <select
            id="claimed"
            name="claimed"
            value={form.claimed}
            onChange={handleChange}
            required>
            <option value="">Select status</option>
            {claimedOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Item Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., iPhone 13 Pro, Gold Ring, Car Keys"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide a detailed description of the item, including any identifying features..."
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dateLost">Date Lost*</label>
            <input
              type="date"
              id="dateLost"
              name="dateLost"
              value={form.dateLost}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location*</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g., Central Park, NYC Public Library, Main Street Mall"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="featured-image-container">
          <h3>Featured Image</h3>
          <div className="image-preview">
            {imagePreview ? (
              <img src={imagePreview} alt="Selected" />
            ) : (
              <div className="placeholder">
                <span role="img" aria-label="image icon">
                  🖼️
                </span>
                <p>No image selected</p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="fileUpload"
            className="file-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Contact Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Back to Home
          </button>
          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportItem;
