import React from "react";

const ELDDetails = ({ logs }) => {
  return (
    <div>
      <h2>Daily Log Sheets</h2>
      {logs.map((log, index) => (
        <div key={index}>
          <h3>Day {index + 1}</h3>
          <p>Driving Time: {log.driving_time} hours</p>
          <p>Rest Period: {log.rest_period} hours</p>
          <p>Fueling Stops: {log.fueling_stops}</p>
        </div>
      ))}
    </div>
  );
};

export default ELDDetails;
