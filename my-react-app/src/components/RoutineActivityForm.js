import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { callApi } from "../api";

const RoutineActivityForm = ({ routineActivityInfo, routineInfo }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [routineActivity, setRoutineActivity] = useState({
    count: 0,
    duration: 0,
  });
  const [token, setToken] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = routineActivityInfo
      ? `routine_activities/${routineActivity?.routineActivityId}`
      : `routines/${routineInfo.id}/activities`;
    const method = routineActivityInfo ? "patch" : "post";
    const body = JSON.stringify(
      routineActivityInfo
        ? { count: routineActivity.count, duration: routineActivity.duration }
        : {
            ...routineActivity,
            activityId: selectedActivity,
          }
    );

    const data = await callApi({ url, method, token, body });
    if (data) {
      navigate(`/routines`);
    }
  };

  const getActivities = async () => {
    const data = await callApi({ url: "/activities" });
    setActivities(data);
  };

  useEffect(() => {
    if (routineActivityInfo) {
      setRoutineActivity(routineActivityInfo);
    }
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setToken(token);
    }
    getActivities();
    console.log(routineInfo);
  }, []);
  return (
    <>
      <h2 className="p-3 bg-info text-white">
        {routineActivityInfo
          ? "Edit Routine Activity"
          : "Add New Routine Activity"}
      </h2>
      <form
        className="routineActivity-form form-wrapper"
        onSubmit={handleSubmit}
      >
        <div className="form-field-label">
          <label htmlFor="activity" className="form-label">
            {routineActivityInfo
              ? `Selected Activity: ${routineActivityInfo.name}`
              : "Select Activity"}
          </label>
        </div>
        <div className="form-field">
          {routineActivityInfo ? (
            ""
          ) : (
            <select
              id="activity"
              className="form-input"
              value={selectedActivity?.name}
              onChange={(e) => {
                console.log("value", e.target.value);
                setSelectedActivity(e.target.value);
              }}
            >
              {activities.map((activity) => (
                <option key={`${activity?.id}`} value={activity?.id}>
                  {activity?.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="form-field-label">
          <label htmlFor="count" className="form-label">
            Count
          </label>
        </div>
        <div className="form-field">
          <input
            id="count"
            required
            className="form-input"
            value={routineActivity?.count}
            placeholder="Count*"
            onChange={(event) => {
              setRoutineActivity({
                ...routineActivity,
                count: event.target.value,
              });
            }}
          />
        </div>
        <div className="form-field-label">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
        </div>
        <div className="form-field">
          <input
            id="duration"
            className="form-input form-control"
            required
            value={routineActivity?.duration}
            placeholder="Duration*"
            onChange={(event) => {
              setRoutineActivity({
                ...routineActivity,
                duration: event.target.value,
              });
            }}
          />
        </div>
        <button className="form-submit-btn" type="submit">
          {routineActivityInfo ? "Save" : "Create"}
        </button>
        <button
          className="btn btn-secondary form-submit-btn mt-3"
          type="cancel"
          onClick={(e) => {
            e.preventDefault();
            navigate("/routines");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default RoutineActivityForm;
