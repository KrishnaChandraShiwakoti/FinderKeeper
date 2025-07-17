import React, { useEffect, useState } from "react";
import { items } from "../Utlis/axios";
import "../Styles/BrowserItems.css";
import "../Styles/BrowserItems.css";
import { toast } from "react-toastify";
import Filter from "../Components/Filter";

const BrowserItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BEARER_TOKEN = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await items.get("/", {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (res.status === 200) {
          setItemsList(res.data.data);
          setFilteredItems(res.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error while fetching");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (filter) => {
    let filtered = itemsList;
    if (filter.category) {
      filtered = filtered.filter((item) => item.category === filter.category);
    }
    if (filter.location) {
      filtered = filtered.filter(
        (item) =>
          item.location &&
          item.location.toLowerCase().includes(filter.location.toLowerCase())
      );
    }
    if (filter.dateFrom) {
      filtered = filtered.filter((item) => {
        const itemDate = item.date?.slice(0, 10);
        return itemDate && itemDate >= filter.dateFrom;
      });
    }
    if (filter.dateTo) {
      filtered = filtered.filter((item) => {
        const itemDate = item.date?.slice(0, 10);
        return itemDate && itemDate <= filter.dateTo;
      });
    }
    setFilteredItems(filtered);
  };

  return (
    <>
      <Filter onFilter={handleFilter} />
      <div className="browser-items-bg">
        <h2 className="browser-title">All Reported Items</h2>
        {isLoading ? (
          <div className="browser-loading">Loading...</div>
        ) : (
          <div className="browser-items-list">
            {filteredItems.length === 0 ? (
              <div className="browser-no-items">No items found.</div>
            ) : (
              filteredItems.map((item) => (
                <div className="browser-item-card" key={item.itemId}>
                  <div className="browser-item-image">
                    {item.imageUrl ? (
                      <img
                        src={`http://localhost:3000${item.imageUrl}`}
                        alt={item.name}
                      />
                    ) : (
                      <div className="browser-item-placeholder">No Image</div>
                    )}
                  </div>
                  <div className="browser-item-info">
                    <h3>{item.name}</h3>
                    <p className="browser-item-category">
                      Category: {item.category}
                    </p>
                    <p className="browser-item-desc">{item.description}</p>
                    <p className="browser-item-location">
                      Location: {item.location}
                    </p>
                    <p className="browser-item-date">
                      Date Lost: {item.date?.slice(0, 10)}
                    </p>
                    <p className="browser-item-email">
                      Contact: {item.contact}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BrowserItems;
