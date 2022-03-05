import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { callApi } from "../api";

const RoutinesByActivity = (props) => {
  const { activityId, activityName } = useParams();
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);

  const getRoutinesByActivityId = async () => {
    const data = await callApi({ url: `activities/${activityId}/routines` });
    setRoutines(data);
  };

  useEffect(() => {
    getRoutinesByActivityId();
  }, []);
  return (
    <>
      <h5 className="p-3 bg-info text-white">{`Routines associated  with ${activityName} activity`}</h5>
      <button
        type="button"
        className="btn btn-success"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/routines`);
        }}
      >
        {"< Back"}
      </button>
      {routines.length ? (
        <table className="table table-striped">
          <thead>
            <tr className="custom-row">
              <th scope="col">#</th>
              <th scope="col">Routine Name</th>
              <th scope="col">Goal</th>
              <th scope="col">Activites Count</th>
            </tr>
          </thead>
          <tbody>
            {routines?.map((routine, pos) => (
              <tr className="custom-row" key={`${routine.id}_${pos}`}>
                <td>{pos}</td>
                <td>{routine.name}</td>
                <td>{routine.goal}</td>
                <td>{routine.activities?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p
          className="text-secondary text-sm fst-italic"
          style={{ fontSize: "12px" }}
        >
          There is no data
        </p>
      )}
    </>
  );
};

export default RoutinesByActivity;
