import { useEffect, useState } from "react";
import { callApi } from "../api";
import { useNavigate } from "react-router";
import { CardItem } from "./";
import RoutineActivitiesTable from "./RoutineActivitiesTable";

const Routine = ({
  routine,
  getRoutines,
  setSelectedRoutine,
  setSelectedRoutineActivity,
}) => {
  const [routineActivities, setRoutineActivities] = useState([]);

  const deleteRoutine = async (routine, pos) => {
    const { id } = routine;
    const response = await callApi({
      url: `routines/${id}`,
      method: `delete`,
    });
    if (response?.success) {
      getRoutines();
    }
  };

  const deleteActivityFromRoutine = async (id) => {
    const response = await callApi({
      url: `routine_activities/${id}`,
      method: `delete`,
    });
    if (response?.success) {
      const newActivities = routineActivities.filter(
        (item) => item.routineActivityId !== id
      );
      setRoutineActivities(newActivities);
    }
  };

  const removeActivityFromRoutine = (activity) => {
    deleteActivityFromRoutine(activity.routineActivityId);
  };

  const addActivityToRoutine = (routine) => {
    setSelectedRoutine(routine);
    setSelectedRoutineActivity(null);
    navigate("/routine_activities/form");
  };

  const editRoutineActivity = (routineActivity) => {
    setSelectedRoutine(null);
    setSelectedRoutineActivity(routineActivity);
    navigate("/routine_activities/form");
  };

  const navigate = useNavigate();

  useEffect(() => {
    setRoutineActivities(routine?.activities || []);
  }, [routine]);

  return (
    <div className="routine-card" key={`routine-${routine.id}`}>
      <div className="d-flex align-items-center justify-content-between routine-card-header mb-2">
        <div
          className="routine-name text-info btn px-0"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {routine.name}
        </div>
        <div className="d-flex align-items-center">
          <div
            className="btn btn-info app-btn mr-4"
            onClick={(e) => {
              e.preventDefault();
              setSelectedRoutine(routine);
              navigate("/routines/form");
            }}
          >
            Edit
          </div>
          <div
            className="btn btn-danger app-btn"
            onClick={(e) => {
              e.preventDefault();
              deleteRoutine(routine);
            }}
          >
            Remove
          </div>
        </div>
      </div>
      <CardItem label={"Goal"} value={routine.goal} />
      <CardItem
        label={"Created By"}
        value={routine.creatorName}
        valueCss={"btn btn-link px-0"}
      />
      <div className="d-flex justify-content-between align-items-center">
        <header className="section-header"> Activities </header>
        <div
          className="btn btn-link app-btn p-0 text-dark"
          onClick={(e) => {
            e.preventDefault();
            addActivityToRoutine(routine);
          }}
        >
          + Add Activity
        </div>
      </div>

      <RoutineActivitiesTable
        rows={routineActivities}
        removeActivityFromRoutine={removeActivityFromRoutine}
        editRoutineActivity={editRoutineActivity}
      />
    </div>
  );
};

export default Routine;
