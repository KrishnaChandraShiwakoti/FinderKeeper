import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="navbar sticky-nav">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <FaMapMarkerAlt className="navbar-logo-icon" />
            <span className="navbar-title">FinderKeeper</span>
          </Link>
          <div className="navbar-links desktop-only">
            <NavLink to="/" className="navbar-link">
              Home
            </NavLink>
            <NavLink to="/browse" className="navbar-link">
              <FaSearch className="navbar-link-icon" />
              Browse Items
            </NavLink>
            <NavLink to="/reportItem" className="navbar-link">
              <FaPlusCircle className="navbar-link-icon" />
              Report Item
            </NavLink>
          </div>
        </div>
        <div className="navbar-right desktop-only">
          {user ? (
            <div className="user-dropdown-container" ref={dropdownRef}>
              <div
                className="user-icon"
                onClick={() => setDropdownOpen((v) => !v)}>
                <FaUser className="navbar-link-icon" />
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-user-info">
                    <div className="dropdown-user-name">{user.name}</div>
                    <div className="dropdown-user-email">{user.email}</div>
                    <hr
                      style={{
                        margin: "8px 0",
                        border: 0,
                        borderTop: "1px solid #eee",
                      }}
                    />
                  </div>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                  <button
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}>
                    <FaSignOutAlt style={{ marginRight: 8 }} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-login">
                Login
              </Link>
              <Link to="/register" className="navbar-register">
                Register
              </Link>
            </>
          )}
        </div>
        <div className="mobile-menu-btn mobile-only">
          <button onClick={toggleMenu} className="navbar-menu-btn">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu mobile-only">
          <NavLink to="/" className="mobile-link" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/search" className="mobile-link" onClick={toggleMenu}>
            <FaSearch className="navbar-link-icon" />
            Browse Items
          </NavLink>
          <NavLink to="/item/new" className="mobile-link" onClick={toggleMenu}>
            <FaPlusCircle className="navbar-link-icon" />
            Report Item
          </NavLink>
          <div className="mobile-divider" />
          {user ? (
            <>
              <NavLink
                to="/updateProfile"
                className="mobile-link"
                onClick={toggleMenu}>
                <FaUser className="navbar-link-icon" />
                Profile
              </NavLink>
              <NavLink
                to="/account"
                className="mobile-link"
                onClick={toggleMenu}>
                Account
              </NavLink>
              <NavLink
                to="/settings"
                className="mobile-link"
                onClick={toggleMenu}>
                Settings
              </NavLink>
              <button
                className="mobile-link mobile-logout"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}>
                <FaSignOutAlt className="navbar-link-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" className="mobile-link" onClick={toggleMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
