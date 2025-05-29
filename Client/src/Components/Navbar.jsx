import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import "../Styles/Navbar.css";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  let user = localStorage.getItem("user") || null;

  return (
    <nav>
      <div className="flex container">
        <NavLink to="/" className="logo">
          {/* location logo here */}
          <FaMapMarkerAlt />
          <h1>FinderKeeper</h1>
        </NavLink>
        <NavLinks />
        <div className="search-box">
          {/* search logo goes here */}
          <FaSearch />
          <input type="text" placeholder="Search" />
        </div>
        {user ? (
          <FaUser />
        ) : (
          <div className="button-container">
            <NavLink to="login">
              <button type="button" className="login">
                Login
              </button>
            </NavLink>
            <NavLink to="register">
              <button type="button" className="register">
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
