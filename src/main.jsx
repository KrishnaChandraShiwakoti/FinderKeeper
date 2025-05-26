<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './Pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
=======
<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
>>>>>>> b9cd0e679073f7f3c5e0c39f9dfd254abe65a510

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
=======
    <App />
  </StrictMode>
>>>>>>> fa0eb85b481f772728b3e0047b9e822fcf30871a
);
>>>>>>> b9cd0e679073f7f3c5e0c39f9dfd254abe65a510
