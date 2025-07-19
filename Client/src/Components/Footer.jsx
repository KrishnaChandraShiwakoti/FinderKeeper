import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import "../Styles/Footer.css"; // Linking the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About */}
          <div>
            <div className="footer-brand">
              <MapPin className="icon-large text-teal" />
              <span className="brand-title">FinderKeeper</span>
            </div>
            <p className="footer-description">
              Helping people reconnect with their lost belongings and rewarding
              honest finders since 2025.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">
                <Facebook className="icon-small" />
              </a>
              <a href="#" className="footer-social-link">
                <Twitter className="icon-small" />
              </a>
              <a href="#" className="footer-social-link">
                <Instagram className="icon-small" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lost" className="footer-link">
                  Lost Items
                </Link>
              </li>
              <li>
                <Link to="/found" className="footer-link">
                  Found Items
                </Link>
              </li>
              <li>
                <Link to="/browse" className="footer-link">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/reportItem" className="footer-link">
                  Report Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-links">
              <li>
                <Link to="/browse?category=electronics" className="footer-link">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/browse?category=jewelry" className="footer-link">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/browse?category=documents" className="footer-link">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/browse?category=keys" className="footer-link">
                  Keys
                </Link>
              </li>
              <li>
                <Link to="/browse?category=pets" className="footer-link">
                  Pets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <MapPin className="icon-small text-teal" />
                <span>123 Find Street, Recovery City, FC 10001</span>
              </li>
              <li className="footer-contact-item">
                <Mail className="icon-small text-teal" />
                <span>help@finderkeeper.com</span>
              </li>
              <li className="footer-contact-item">
                <Phone className="icon-small text-teal" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2025 FinderKeeper. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
            <Link to="/faq" className="footer-link">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
