import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { callApi } from "../api";

const RoutinesByUserName = (props) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);

  const getRoutinesByUser = async () => {
    const data = await callApi({ url: `users/${username}/routines` });
    setRoutines(data);
  };

  useEffect(() => {
    getRoutinesByUser();
  }, []);
  return (
    <>
      <h5 className="p-3 bg-info text-white">{`Routines Created By ${username}`}</h5>
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
                <td>{pos + 1}</td>
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

export default RoutinesByUserName;
