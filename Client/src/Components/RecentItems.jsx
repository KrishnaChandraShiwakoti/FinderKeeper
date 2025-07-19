import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/RecentItems.css";
import { items } from "../Utlis/axios";
import ItemCard from "./ItemCard";
const RecentItems = () => {
  const [recentItems, setRecentItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await items.get("/recent");
        if (res.status == 200) {
          setRecentItems(res.data.data);
        }
      } catch (error) {
        setRecentItems([]);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <section className="section">
        <div className="recentItems-container">
          <div className="section-header">
            <h2 className="section-title">Recent Listings</h2>
            <Link to="/browse" className="section-link">
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
