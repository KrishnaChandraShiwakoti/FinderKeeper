// src/registration/RegisterPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import '../App.css';
import "../Styles/Register.css";
import { auth } from "../Utlis/axios";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Form submitted:", form);
    const res = await auth.post("/register", { formData: form });
    if (res.status == 201) {
      toast.success(res.data.message);
      localStorage.setItem("registered", "true");
      navigate(`/register/verification?email=${form.email}`);
    } else {
      console.log(res.data.message);
      toast.error(res.data.message);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-header">
          <div className="register-icon">
            <svg
              width="40"
              height="40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#17A2A5" fillOpacity="0.1" />
              <path
                d="M20 12a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                fill="#17A2A5"
              />
            </svg>
          </div>
          <h2>Create an account</h2>
          <p>
            Join FinderKeeper to report lost items or help others find their
            belongings
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1c-2.33 0-7 1.17-7 3.5V14h14v-1.5C15 10.17 10.33 9 8 9z"
                    fill="#BDBDBD"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                name="fullname"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0l4 4 4-4"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 7V5a4 4 0 1 0-8 0v2"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="7"
                    rx="2"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 7V5a4 4 0 1 0-8 0v2"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="7"
                    rx="2"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create account
          </button>
        </form>

        <div className="register-footer">
          <p className="terms">
            By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </p>
          <p className="signin">
            <Link to="/login">Already have an account? Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
