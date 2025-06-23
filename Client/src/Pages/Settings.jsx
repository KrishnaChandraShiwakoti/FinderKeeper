import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { FaBars } from "react-icons/fa";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <button className="hamburger" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </button>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        style={{
          padding: "2rem",
          marginLeft: sidebarOpen ? 240 : 0,
          transition: "margin 0.3s",
        }}
      >
        <h2>Settings</h2>
        <p>Update your settings here.</p>
      </div>
    </>
  );
};

export default Settings;
