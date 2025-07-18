import React from "react";
import "../Styles/TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms of Service</h1>
      <div className="terms-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using FinderKeeper, you agree to comply with and be
          bound by these Terms of Service. If you do not agree, please do not
          use our platform.
        </p>
        <h2>2. User Responsibilities</h2>
        <ul>
          <li>
            Provide accurate information when registering and reporting items.
          </li>
          <li>
            Respect other users and refrain from abusive or fraudulent behavior.
          </li>
          <li>Do not post illegal, offensive, or misleading content.</li>
        </ul>
        <h2>3. Privacy</h2>
        <p>
          Your personal information is protected as described in our Privacy
          Policy. We do not share your data without consent except as required
          by law.
        </p>
        <h2>4. Limitation of Liability</h2>
        <p>
          FinderKeeper is not responsible for lost, stolen, or misrepresented
          items. Use the platform at your own risk.
        </p>
        <h2>5. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the platform
          means you accept any changes.
        </p>
        <h2>6. Contact</h2>
        <p>For questions, contact us at support@finderkeeper.com.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
