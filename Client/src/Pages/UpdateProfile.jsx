import { useEffect, useState } from "react";
import "../Styles/UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "./Profile";
import { userApi } from "../Utlis/axios";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const user = getUser();
  const BEARER_TOKEN = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: user.name || "",
    contact: user.contact || "",
    email: user.email || "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await userApi.put(`/${user.user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      if (res.status == 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile", error);
    }
  };

  const handleReset = () => {
    navigate("/");
  };

  return (
    <div className="profile-bg">
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* User Info */}
        <div className="profile-card">
          <h3 className="profile-card-title">User info</h3>

          <div className="profile-row">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.name}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="profile-card">
          <h3 className="profile-card-title">Contact info</h3>
          <div className="profile-row">
            <label>Mobile number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div className="profile-row">
            <label>E-mail address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
        </div>

        <div className="profile-actions">
          <button type="submit" className="profile-btn profile-btn-primary">
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="profile-btn profile-btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
