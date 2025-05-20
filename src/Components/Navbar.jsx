import React from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import "../Styles/Navbar.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <NavLink to="/" className="logo">
          {/* location logo here */}
          <FaMapMarkerAlt />
          <h1>FinderKeeper</h1>
        </NavLink>
        <NavLinks />
        <div className="search-box">
          {/* search logo goes here */}
          <FaSearch />
          <input type="text" placeholder="Search" />
        </div>
        <div className="button-container">
          <button type="button" className="login">
            Login
          </button>
          <button type="button" className="register">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
