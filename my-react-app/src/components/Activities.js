import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { callApi } from "../api";
const Activities = (props) => {
  const [activities, setActiviites] = useState([]);

  const getActivities = async () => {
    const data = await callApi({ url: "/activities" });
    setActiviites(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div className="activities-container">
      <div className="activities-header">
        <div className="activities-header-title">Activities</div>
        <div
          className="activities-header-create-btn"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/activities/create`);
          }}
        >
          Create New Activity
        </div>
      </div>
      <div className="activity-wrapper">
        {activities.map((activity, pos) => (
          <div className="activity-card" key={`activity-${pos}`}>
            <div className="activity-name">{activity.name}</div>
            <div className="activity-description">{activity.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
