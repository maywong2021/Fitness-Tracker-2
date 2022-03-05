import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { callApi } from "../api";

const DEFAULT_ACTIVIITES_PATH = "routines";

const RoutineForm = ({ routineInfo }) => {
  const [routine, setRoutine] = useState({
    name: "",
    goal: "",
    isPublic: true,
  });
  const [token, setToken] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = routineInfo
      ? `${DEFAULT_ACTIVIITES_PATH}/${routineInfo.id}`
      : `${DEFAULT_ACTIVIITES_PATH}`;
    const method = routineInfo ? "patch" : "post";
    const { name, goal, isPublic } = routine;
    const body = JSON.stringify({ name, goal, isPublic });
    const data = await callApi({ url, method, token, body });
    if (data) {
      navigate(`/${DEFAULT_ACTIVIITES_PATH}`);
    }
  };

  useEffect(() => {
    if (routineInfo) {
      setRoutine(routineInfo);
    }
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setToken(token);
    }
  }, [routineInfo]);

  return (
    <>
      <h2 className="p-3 bg-info text-white">
        {routineInfo ? "Edit Routine" : "Add New Routine"}
      </h2>

      <form className="routine-form form-wrapper" onSubmit={handleSubmit}>
        <div className="form-field-label">
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-field">
          <input
            id="name"
            required
            className="form-input"
            value={routine?.name}
            placeholder="Name*"
            onChange={(event) => {
              setRoutine({ ...routine, name: event.target.value });
            }}
          />
        </div>
        <div className="form-field-label">
          <label htmlFor="goal" className="form-label">
            Goal
          </label>
        </div>
        <div className="form-field">
          <input
            id="goal"
            className="form-input"
            required
            value={routine?.goal}
            placeholder="Goal*"
            onChange={(event) => {
              setRoutine({ ...routine, goal: event.target.value });
            }}
          />
        </div>
        <button className="form-submit-btn" type="submit">
          {routineInfo ? "Save" : "Create"}
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

export default RoutineForm;
