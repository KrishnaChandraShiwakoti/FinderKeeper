import React from "react";
import "../Styles/VerifyModel.css";

const VerifyModel = ({ title, description, path, data, setFalse }) => {
  return (
    <div className="verify-container">
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="btns-container">
        <button className="cancel-btn" onClick={() => setFalse(true)}>
          Cancel
        </button>
        <button className="submit-btn">Ok</button>
      </div>
    </div>
  );
};

export default VerifyModel;
