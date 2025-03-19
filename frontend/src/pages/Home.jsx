import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const Home = () => {
  const [formData, setFormData] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/trips/`,
        formData
      );
      navigate(`/trip/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Trip Planner</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Current Location:</label>
            <input
              type="text"
              value={formData.current_location}
              onChange={(e) =>
                setFormData({ ...formData, current_location: e.target.value })
              }
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Pickup Location:</label>
            <input
              type="text"
              value={formData.pickup_location}
              onChange={(e) =>
                setFormData({ ...formData, pickup_location: e.target.value })
              }
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Dropoff Location:</label>
            <input
              type="text"
              value={formData.dropoff_location}
              onChange={(e) =>
                setFormData({ ...formData, dropoff_location: e.target.value })
              }
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Current Cycle Used (Hrs):</label>
            <input
              type="number"
              value={formData.current_cycle_used}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current_cycle_used: parseFloat(e.target.value),
                })
              }
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Plan Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
