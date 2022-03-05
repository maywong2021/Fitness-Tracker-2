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
    const { name, description } = activity;
    const body = { name, description };
    const data = await callApi({
      url,
      method,
      token,
      body,
      displayErrorNotification: true,
    });
    console.log("... ", data);
    if (data) {
      navigate(`/${DEFAULT_ACTIVIITES_PATH}`);
    }
  };

  useEffect(() => {
    if (activityInfo) {
      setActivity(activityInfo);
    }
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [activityInfo]);

  return (
    <>
      <h2 className="p-3 bg-info text-white">
        {activityInfo ? "Edit Activity" : "Add New Activity"}
      </h2>
      <form className="activity-form form-wrapper" onSubmit={handleSubmit}>
        <div className="form-field-label">
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-field">
          <input
            required
            className="form-input"
            value={activity?.name}
            disabled={activity?.id ? true : false}
            placeholder="Name*"
            onChange={(event) => {
              setActivity({ ...activity, name: event.target.value });
            }}
          />
        </div>
        <div className="form-field-label">
          <label htmlFor="description" className="form-label">
            Description
          </label>
        </div>
        <div className="form-field">
          <input
            id="description"
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
        <button
          className="btn btn-secondary form-submit-btn mt-3"
          type="cancel"
          onClick={(e) => {
            e.preventDefault();
            navigate("/activities");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default ActivityForm;
