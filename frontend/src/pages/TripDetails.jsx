import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import ELDDetails from "../components/ELDDetails";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/trips/${id}/`
      );
      setTrip(response.data);
    };
    fetchTrip();
  }, [id]);

  if (!trip) return <p className="loading-text">Loading...</p>;

  const coordinates = [
    [trip.current_location_lng, trip.current_location_lat],
    [trip.pickup_location_lng, trip.pickup_location_lat],
    [trip.dropoff_location_lng, trip.dropoff_location_lat],
];

  const logs = [
    { driving_time: 11, rest_period: 10, fueling_stops: 1 },
    { driving_time: 11, rest_period: 10, fueling_stops: 1 },
  ];

  return (
    <div className="trip-details">
      <h1 className="trip-title">Trip Details</h1>
      <div className="trip-container">
        <div className="map-container">
          <MapComponent coordinates={coordinates} />
        </div>
        <div className="details-container">
          <ELDDetails logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
