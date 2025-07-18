import React from "react";
import "../Styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-content">
        <h2>1. Introduction</h2>
        <p>
          FinderKeeper values your privacy. This policy explains how we collect,
          use, and protect your personal information when you use our platform.
        </p>
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Account information (name, email, password)</li>
          <li>Item details you report or claim</li>
          <li>Usage data and device information</li>
        </ul>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our services</li>
          <li>To communicate with you about your account or items</li>
          <li>To ensure platform security and prevent fraud</li>
        </ul>
        <h2>4. Data Sharing</h2>
        <p>
          We do not sell or share your personal data with third parties except
          as required by law or to provide our services (e.g., email
          verification).
        </p>
        <h2>5. Data Security</h2>
        <p>
          We use industry-standard measures to protect your data. However, no
          method of transmission or storage is 100% secure.
        </p>
        <h2>6. Your Rights</h2>
        <ul>
          <li>
            You can access, update, or delete your account information at any
            time.
          </li>
          <li>Contact us to request data deletion or correction.</li>
        </ul>
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy. Continued use of FinderKeeper means
          you accept any changes.
        </p>
        <h2>8. Contact</h2>
        <p>For privacy questions, email support@finderkeeper.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
