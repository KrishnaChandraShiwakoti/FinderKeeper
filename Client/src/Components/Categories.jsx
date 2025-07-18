import { MapPin, Compass, MessageCircle, Zap, User } from "lucide-react";
import "../Styles/Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: <Zap />, category: "electronics" },
  { name: "Jewelry", icon: <MapPin />, category: "jewelry" },
  { name: "Documents", icon: <MessageCircle />, category: "documents" },
  { name: "Keys", icon: <Compass />, category: "keys" },
  { name: "Pets", icon: <Zap />, category: "pets" },
  { name: "Person", icon: <User />, category: "person" },
  { name: "Accessories", icon: <MessageCircle />, category: "accessories" },
  { name: "Other", icon: <Compass />, category: "other" },
];
const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/browse?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="section categories-section">
      <div className="categories-container">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="category-card">
              <div className="category-icon">{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
