import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import { FaTimes, FaUser, FaCog, FaHome, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ open, onClose }) => {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header">
        Dashboard
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: "1.3rem", cursor: "pointer" }}>
          <FaTimes />
        </button>
      </div>
      <div className="sidebar-links">
        <NavLink to="/profile" className="sidebar-link" onClick={onClose}>
          <FaUser style={{ marginRight: 8 }} /> Profile
        </NavLink>
        <NavLink to="/account" className="sidebar-link" onClick={onClose}>
          <FaHome style={{ marginRight: 8 }} /> My Account
        </NavLink>
        <NavLink to="/settings" className="sidebar-link" onClick={onClose}>
          <FaCog style={{ marginRight: 8 }} /> Settings
        </NavLink>
        <NavLink to="/" className="sidebar-link" onClick={() => { localStorage.removeItem("user"); onClose(); window.location.reload(); }}>
          <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
