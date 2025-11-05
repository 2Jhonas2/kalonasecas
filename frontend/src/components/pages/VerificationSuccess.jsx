import React from "react";
import "./VerificationSuccess.css"; // Import the CSS file

function VerificationSuccess() {
  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="verification-icon">✔</div>
        <h2>Account Verified Successfully!</h2>
        <p>
          Your account has been successfully verified. You can now log in and
          start using all features.
        </p>
        <a href="/" className="verification-button">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default VerificationSuccess;
