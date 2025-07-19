import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="browser-item-card"
      key={item.itemId}
      onClick={() => {
        navigate(`/item/${item.itemId}`);
      }}>
      <div className="browser-item-image">
        {item.imageUrl ? (
          <img src={`http://localhost:3000${item.imageUrl}`} alt={item.name} />
        ) : (
          <div className="browser-item-placeholder">No Image</div>
        )}
      </div>
      <div className="browser-item-info">
        <div className="browser-item-title-row">
          <h3>{item.name}</h3>
          {item.claimed && (
            <span
              className={`claimed-badge claimed-${item.claimed.toLowerCase()}`}>
              {item.claimed}
            </span>
          )}
        </div>
        <p className="browser-item-category">Category: {item.category}</p>
        <p className="browser-item-desc">{item.description}</p>
        <p className="browser-item-location">Location: {item.location}</p>
        <p className="browser-item-date">
          Date Lost: {item.date?.slice(0, 10)}
        </p>
        <p className="browser-item-email">Contact: {item.contact}</p>
      </div>
    </div>
  );
};

export default ItemCard;
