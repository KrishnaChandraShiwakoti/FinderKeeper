import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ReportItem.css';

const categories = [
  'Electronics',
  'Jewelry',
  'Clothing',
  'Documents',
  'Bags',
  'Keys',
  'Other'
];

const ReportItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    status: false,
    name: '',
    description: '',
    category: '',
    dateLost: '',
    location: '',
    image: null,
    email: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log(form);
  };

  const handleCancel = () => {
    navigate('/register', { replace: true });
  };

  return (
    <div className="report-bg">
      <form className="report-container" onSubmit={handleSubmit}>
        <div className="report-back">
          <Link to="/register" className="back-link">&lt; Back to Register</Link>
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
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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

        <div className="form-group">
          <label>Item Image</label>
          <div className="image-upload">
            <label htmlFor="image-upload-input" className="image-upload-label">
              <div className="image-upload-box">
                <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#F3F4F6"/>
                  <path d="M24 16v16M16 24h16" stroke="#17A2A5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <span className="upload-text">Upload an image or drag and drop</span>
                  <span className="upload-hint">PNG, JPG, GIF up to 10MB</span>
                </div>
              </div>
              <input
                id="image-upload-input"
                type="file"
                name="image"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
            </label>
            {form.image && <div className="image-filename">{form.image.name}</div>}
          </div>
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
          <button type="button" className="cancel-btn" onClick={handleCancel}>Back to Register</button>
          <button type="submit" className="submit-btn">Submit Report</button>
        </div>
      </form>
    </div>
  );
};

export default ReportItem;
