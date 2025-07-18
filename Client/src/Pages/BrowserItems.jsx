import React, { useEffect, useState } from "react";
import { items } from "../Utlis/axios";
import "../Styles/BrowserItems.css";
import "../Styles/BrowserItems.css";
import { toast } from "react-toastify";
import Filter from "../Components/Filter";
import ItemCard from "../Components/ItemCard";
import { useParams } from "react-router-dom";

const BrowserItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BEARER_TOKEN = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const category = params.has("category") ? params.get("category") : null;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await items.get("/");
        if (res.status === 200) {
          setItemsList(res.data.data);
          // If category is present, filter immediately
          if (category) {
            const filtered = res.data.data.filter(
              (item) => item.category === category
            );
            setFilteredItems(filtered);
          } else {
            setFilteredItems(res.data.data);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error while fetching");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

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
      <Filter onFilter={handleFilter} initialFilter={category} />
      <div className="browser-items-bg">
        <h2 className="browser-title">All Reported Items</h2>
        {isLoading ? (
          <div className="browser-loading">Loading...</div>
        ) : (
          <div className="browser-items-list">
            {filteredItems.length === 0 ? (
              <div className="browser-no-items">No items found.</div>
            ) : (
              filteredItems.map((item) => <ItemCard item={item} />)
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BrowserItems;
