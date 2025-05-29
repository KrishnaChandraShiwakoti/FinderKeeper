import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const links = [
  { id: 1, url: "/", text: "Home" },
  { id: 2, url: "report_item", text: "Report Item" },
  { id: 3, url: "lost_item", text: "Lost Item" },
];
const NavLinks = () => {
  return (
    <div className="links">
      {links.map((link) => {
        const { id, url, text } = link;

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};

export default NavLinks;
