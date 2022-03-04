import { useEffect, useState } from "react";
import { callApi } from "../api";
import { useNavigate } from "react-router";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  const getRoutines = async () => {
    const data = await callApi({ url: "/routines" });
    setRoutines(data);
  };

  // const fetchRoutines = async () => {
  //     const fetchedRoutines = await fetchRoutines;
  //     setRoutines(fetchedRoutines);
  // }
  const navigate = useNavigate();
  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <div className="routines">
      <h2>Routines</h2>
      {routines.map((routine) => {
        return (
          <>
            <div key={routine.id}>
              <div>{routine.name}</div>
              <div>{routine.goal}</div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Routines;
