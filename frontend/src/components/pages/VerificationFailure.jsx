import React from "react";
import { useLocation } from "react-router-dom";
import "./VerificationFailure.css"; // Import the CSS file

function VerificationFailure() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message =
    queryParams.get("message") ||
    "An error occurred during the verification of your account.";

  return (
    <div className="verification-container">
      <div className="verification-card failure">
        <div className="verification-icon failure-icon">✖</div>
        <h2>Account Verification Failed</h2>
        <p>{message}</p>
        <a href="/" className="verification-button failure-button">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default VerificationFailure;
