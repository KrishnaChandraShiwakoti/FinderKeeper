import React from "react";

const Confirm = (title, desc) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{desc}</p>
      <div className="buttons-container">
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
};

export default Confirm;
