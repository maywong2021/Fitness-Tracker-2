import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { callApi } from "../api";

const DEFAULT_ACTIVIITES_PATH = "activities";

const ActivityForm = ({ activityInfo }) => {
  const [activity, setActivity] = useState({
    name: "",
    description: "",
  });
  const [token, setToken] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = activityInfo
      ? `${DEFAULT_ACTIVIITES_PATH}/${activityInfo.id}`
      : `${DEFAULT_ACTIVIITES_PATH}`;
    const method = activityInfo ? "patch" : "post";
    const body = JSON.stringify(activity);
    const data = await callApi({ url, method, token, body });
    console.log("... ", data);
    if (data) {
      navigate(`/${DEFAULT_ACTIVIITES_PATH}`);
    }
  };

  useEffect(() => {
    if (activityInfo) {
      setActivity(activityInfo);
    }
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setToken(token);
    }
  }, [activityInfo]);

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <h2> {activityInfo ? "Edit Activity" : "Add New Activity"}</h2>
      <div className="form-field">
        <input
          required
          className="form-input"
          value={activity?.name}
          placeholder="Name*"
          onChange={(event) => {
            setActivity({ ...activity, name: event.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <input
          className="form-input"
          required
          value={activity?.description}
          placeholder="Description*"
          onChange={(event) => {
            setActivity({ ...activity, description: event.target.value });
          }}
        />
      </div>

      <button className="form-submit-btn" type="submit">
        {activityInfo ? "Save" : "Create"}
      </button>
    </form>
  );
};

export default ActivityForm;
