import { useState } from "react";
import "../Styles/Filter.css";

const categories = [
  "Electronics",
  "Jewelry",
  "Clothing",
  "Documents",
  "Bags",
  "Keys",
  "Other",
];

const Filter = ({ onFilter }) => {
  const [filter, setFilter] = useState({
    category: "",
    location: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilter) onFilter(filter);
  };

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={filter.category}
          onChange={handleChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={filter.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
      </div>
      <div className="filter-group">
        <label>Date Lost Range</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="date"
            name="dateFrom"
            value={filter.dateFrom}
            onChange={handleChange}
            placeholder="From"
          />
          <span style={{ alignSelf: "center" }}>to</span>
          <input
            type="date"
            name="dateTo"
            value={filter.dateTo}
            onChange={handleChange}
            placeholder="To"
          />
        </div>
      </div>
      <button type="submit" className="filter-btn">
        Apply Filter
      </button>
    </form>
  );
};

export default Filter;
