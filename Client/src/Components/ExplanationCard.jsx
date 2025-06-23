import React from "react";

const ExplanationCard = ({ description, title, icon }) => {
  return (
    <div className="how-card">
      <div className="how-icon">
        <div className="">{icon}</div>
      </div>
      <h3 className="how-title">{title}</h3>
      <p className="how-text">{description}</p>
    </div>
  );
};

export default ExplanationCard;
