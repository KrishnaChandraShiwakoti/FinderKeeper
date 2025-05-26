import React from "react";
import { Link } from "react-router-dom";
import "../Styles/RecentItems.css";
const RecentItems = () => {
  const recentItems = [];
  return (
    <div>
      <section className="section">
        <div className="recentItems-container">
          <div className="section-header">
            <h2 className="section-title">Recent Listings</h2>
            <Link to="/search" className="section-link">
              View All →
            </Link>
          </div>
          <div className="items-grid">
            {recentItems.length > 0 ? (
              recentItems?.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <h1>No Items Yet</h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecentItems;
