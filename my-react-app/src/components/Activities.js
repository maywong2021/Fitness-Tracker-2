import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActivityRoutines } from ".";
import { callApi } from "../api";
import { CardItem } from "./";

const Activities = ({ setSelectedActivity, userInfo }) => {
  const [activities, setActivities] = useState([]);
  const [activityRoutines, setActivityRoutines] = useState(null);
  const [activityIdForRoutines, setActivityIdForRoutines] = useState(null);
  const navigate = useNavigate();

  const getActivities = async () => {
    const data = await callApi({ url: "/activities" });
    setActivities(data);
  };

  const getRoutinesByActivityId = async (activityId) => {
    if (activityIdForRoutines === activityId) {
      setActivityIdForRoutines(null);
      setActivityRoutines(null);
    } else {
      setActivityIdForRoutines(activityId);
      const data = await callApi({ url: `/activities/${activityId}/routines` });
      setActivityRoutines(data);
    }
  };

  const navigateToActivityForm = (activity) => {
    if (activity) {
      setSelectedActivity(activity);
    } else {
      setSelectedActivity(null);
    }
    navigate(`/activities/form`);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div className="activities-container">
      <div className="activities-header">
        <div className="activities-header-title">Activities</div>
        <div
          className="btn activities-header-create-btn"
          onClick={(e) => {
            e.preventDefault();
            navigateToActivityForm();
          }}
        >
          Create New Activity
        </div>
      </div>
      <div className="activity-wrapper">
        {activities.map((activity, pos) => (
          <div className="activity-card" key={`activity-${pos}`}>
            <div className="d-flex align-items-center justify-content-between activity-card-header mb-2">
              <div
                className="activity-name text-info btn px-0"
                onClick={(e) => {
                  e.preventDefault();
                  getRoutinesByActivityId(activity.id);
                }}
              >
                {activity.name}
              </div>
              <div
                className="btn btn-info app-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setActivityIdForRoutines(activity.id);
                  navigateToActivityForm(activity);
                }}
              >
                Edit
              </div>
            </div>
            {activity.id === activityIdForRoutines ? (
              <ActivityRoutines routines={activityRoutines} />
            ) : (
              ""
            )}
            <CardItem label={"Description"} value={activity.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
