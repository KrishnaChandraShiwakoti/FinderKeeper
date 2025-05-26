import React from "react";
import "../Styles/Hero.css";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Found Something? Lost Something?</h1>
        <p className="hero-subtitle">
          FinderKeeper helps people reconnect with their lost items.
        </p>
      </div>
      <form action="" className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search something for found or lost item..."
          />
          <button className="search-button">
            <Search className="icon-small" />
            Search
          </button>
        </div>
      </form>
      <div className="hero-links">
        <Link to="/lost" className="link-lost">
          I Lost Something
        </Link>
        <Link to="/found" className="link-found">
          I Found Something
        </Link>
      </div>
    </div>
  );
};

export default Hero;
