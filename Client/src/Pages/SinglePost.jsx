import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { items } from "../Utlis/axios";
import "../Styles/SinglePost.css";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await items.get(`/${id}`);
        if (res.status === 200) {
          setItem(res.data);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error while fetching");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="singlepost-loading">Loading...</div>;
  }

  if (!item) {
    return <div className="singlepost-noitem">No item found.</div>;
  }

  return (
    <div className="singlepost-container">
      <button
        className="singlepost-back-btn"
        onClick={() => navigate("/browse")}>
        {"< Back to Browse"}
      </button>
      <div className="singlepost-details-col">
        <div className="singlepost-title-row">
          <h2 className="singlepost-title">{item.name}</h2>
          <span className="singlepost-status-badge">
            <span className={`claimed`}>{item.claimed}</span>
          </span>
        </div>
        <div className="singlepost-image-col">
          {item.imageUrl ? (
            <img
              src={`http://localhost:3000${item.imageUrl}`}
              alt={item.name}
            />
          ) : (
            <div className="singlepost-placeholder">No Image</div>
          )}
        </div>
        <div className="singlepost-info-col">
          <p className="singlepost-category">Category: {item.category}</p>
          <p className="singlepost-desc">{item.description}</p>
          <p className="singlepost-location">Location: {item.location}</p>
          <p className="singlepost-date">
            Date Lost: {item.date?.slice(0, 10)}
          </p>
          <p className="singlepost-email">Contact: {item.contact}</p>
          <button
            className="singlepost-contact-btn"
            onClick={() => {
              window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${item.contact}`,
                "_blank"
              );
            }}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
