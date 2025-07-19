import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { items, userApi } from "../Utlis/axios";
import { toast } from "react-toastify";
import { handleLogout } from "../Utlis/jwt";

export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      user || {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 234 567 8901",
        joined: "2024-01-15",
        location: "New York, USA",
        user_id: 1,
      }
    );
  } catch {
    return {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234 567 8901",
      joined: "2024-01-15",
      location: "New York, USA",
      user_id: 1,
    };
  }
};

const Profile = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [userPosts, setUserPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const BEARER_TOKEN = localStorage.getItem("token");

  useEffect(() => {
    if (activeTab === "post") {
      setIsLoadingPosts(true);
      const fetchData = async () => {
        try {
          const res = await items.get(`/user/${user.user_id}`, {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          });
          if (res.status == 200) {
            toast.success("Post Fetched Successfully");
            setUserPosts(res.data.data);
            setIsLoadingPosts(false);
          } else {
            setUserPosts([]);
            toast.error("Failed to fetch posts");
            setIsLoadingPosts(false);
          }
        } catch (error) {
          setIsLoadingPosts(false);
        }
      };
      fetchData();
    }
  }, [activeTab, user.user_id]);

  const handleClaimedChange = async (itemId, claimed) => {
    try {
      await items.put(
        `/${itemId}`,
        { claimed },
        {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
      );
      setUserPosts((prev) =>
        prev.map((item) =>
          item.itemId === itemId ? { ...item, claimed } : item
        )
      );
      toast.success("Claimed status updated");
    } catch {
      toast.error("Failed to update claimed status");
    }
  };

  const handleDeletePost = async (itemId) => {
    setIsDeleting(true);
    try {
      await items.delete(`/${itemId}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      setUserPosts((prev) => prev.filter((item) => item.itemId !== itemId));
      toast.success("Post deleted");
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post");
      setIsDeleting(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const form = {
      currentPassword: password,
      newPassword,
    };
    try {
      const res = await userApi.put(`/password/${user.user_id}`, form, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      if (res.status == 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setPassword("");
    setNewPassword("");
  };

  const handleDeleteAccount = async () => {
    try {
      await userApi.delete(`/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      handleLogout("Account deleted");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="profile-main-layout">
      <aside className="profile-sidebar">
        <button
          className={`profile-tab-btn${
            activeTab === "account" ? " active" : ""
          }`}
          onClick={() => setActiveTab("account")}>
          Account
        </button>
        <button
          className={`profile-tab-btn${activeTab === "post" ? " active" : ""}`}
          onClick={() => setActiveTab("post")}>
          Post
        </button>
        <button
          className={`profile-tab-btn${
            activeTab === "settings" ? " active" : ""
          }`}
          onClick={() => setActiveTab("settings")}>
          Settings
        </button>
      </aside>
      <section className="profile-content">
        {activeTab === "account" && (
          <div className="profile-container">
            <div className="profile-avatar">
              <FaUserCircle size={90} />
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
            <div className="profile-info">
              <div className="profile-info-row">
                <span>Phone</span>
                <span>{user.phone}</span>
              </div>
              <div className="profile-info-row">
                <span>Location</span>
                <span>{user.location}</span>
              </div>
              <div className="profile-info-row">
                <span>Joined</span>
                <span>{user.joined}</span>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className="profile-btn"
                onClick={() => navigate("/updateProfile")}>
                Edit Profile
              </button>
              <button
                className="profile-btn"
                style={{ background: "#e53935" }}
                onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        )}
        {activeTab === "post" && (
          <div className="profile-posts-container">
            <h3>Your Posts</h3>
            {isLoadingPosts ? (
              <div className="profile-loading">Loading...</div>
            ) : userPosts.length === 0 || userPosts == null ? (
              <div className="profile-no-posts">No posts found.</div>
            ) : (
              <div className="profile-posts-list">
                {userPosts.map((item) => (
                  <div className="profile-post-card" key={item.itemId}>
                    <div className="profile-post-title-row">
                      <span className="profile-post-title">{item.name}</span>
                      <select
                        className="profile-claimed-select"
                        value={item.claimed}
                        onChange={(e) =>
                          handleClaimedChange(item.itemId, e.target.value)
                        }>
                        <option value="NotClaimed">NotClaimed</option>
                        <option value="Claimed">Claimed</option>
                        <option value="StillMissing">StillMissing</option>
                        <option value="Found">Found</option>
                      </select>
                      <button
                        className="profile-delete-btn"
                        onClick={() => handleDeletePost(item.itemId)}>
                        {isDeleting ? "Deleting" : "Delete"}
                      </button>
                    </div>
                    <div className="profile-post-details">
                      <span>{item.category}</span> |{" "}
                      <span>{item.date?.slice(0, 10)}</span>
                    </div>
                    <div className="profile-post-desc">{item.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "settings" && (
          <div className="profile-settings-container">
            <h3>Change Password</h3>
            <form
              className="profile-settings-form"
              onSubmit={handlePasswordChange}>
              <div className="profile-settings-row">
                <label>Current Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="profile-settings-row">
                <label>New Password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button className="profile-btn" type="submit">
                Change Password
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
