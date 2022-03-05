import { useEffect, useState } from "react";
import { callApi } from "../api";
import { useNavigate } from "react-router";
import { Routine } from "./";

const Routines = ({
  setSelectedRoutine,
  setSelectedRoutineActivity,
  userInfo,
}) => {
  const [routines, setRoutines] = useState([]);

  const getRoutines = async () => {
    const data = await callApi({ url: `routines` });
    setRoutines(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <div className="routines-container">
      <div className="routines-header">
        <div className="routines-header-title">Routines</div>
        {userInfo ? (
          <div
            className="btn routines-header-create-btn"
            onClick={(e) => {
              e.preventDefault();

              setSelectedRoutine(null);
              navigate("/routines/form");
            }}
          >
            Create New Routines
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="routine-wrapper">
        {routines.map((routine) => (
          <Routine
            userInfo={userInfo}
            routine={routine}
            getRoutines={getRoutines}
            setSelectedRoutine={setSelectedRoutine}
            setSelectedRoutineActivity={setSelectedRoutineActivity}
            key={`routine_${routine.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Routines;
