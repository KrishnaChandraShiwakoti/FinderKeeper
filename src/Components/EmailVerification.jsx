import React from "react";
import { MailCheck } from "lucide-react";
import "../Styles/EmailVerification.css";

const EmailVerification = () => {
  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-header">
          <MailCheck className="icon-medium" />
          <h2>Verify Your Email</h2>
          <p>We have sent an OPT to your email</p>
        </div>
        <form className="verification-form ">
          <div>
            <input type="number" required />
            <input type="number" required />
            <input type="number" required />
            <input type="number" required />
            <input type="number" required />
            <input type="number" required />
          </div>
          <p>
            Didn't get an opt?<span>Resend the code</span>
          </p>
          <div className="buttons-container">
            <button type="button" className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
