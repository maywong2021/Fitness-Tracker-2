import { useEffect, useState } from "react";
import { fetchRoutines } from "../api";


const Routines = () => {

    const [routines, setRoutines] = useState([]);

    const fetchRoutines = async () => {
        const fetchedRoutines = await fetchRoutines;
        setRoutines(fetchedRoutines);
    }

    useEffect(() => {
        fetchRoutines();
    }, [])

    return (
        <div className="routines">
            <h2>Routines</h2>
            {routines.map((routine) => {
                return(
                    <>
                    <div key={routine.id}>
                    <div>
                        {routine.name}
                    </div>
                    <div>
                        {routine.goal}
                    </div>
                    </div>
                    </>
                )
            })}
        </div>
    )
}

export default Routines;