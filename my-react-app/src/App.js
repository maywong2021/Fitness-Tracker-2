import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  Activities,
  ActivityForm,
  Routines,
  Routine,
  RoutineForm,
  RoutineActivityForm,
} from "./components";

function App() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedRoutineActivity, setSelectedRoutineActivity] = useState(null);

  return (
    <div className="App">
      <nav className="nav"></nav>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/routines"
          element={
            <Routines
              setSelectedRoutineActivity={setSelectedRoutineActivity}
              setSelectedRoutine={setSelectedRoutine}
            />
          }
        />
        <Route
          path="/routines/form"
          element={<RoutineForm routineInfo={selectedRoutine} />}
        />
        <Route
          path="/routine_activities/form"
          element={
            <RoutineActivityForm
              routineInfo={selectedRoutine}
              routineActivityInfo={selectedRoutineActivity}
            />
          }
        />
        <Route
          path="/activities"
          element={<Activities setSelectedActivity={setSelectedActivity} />}
        />
        <Route
          path="/activities/form"
          element={<ActivityForm activityInfo={selectedActivity} />}
        />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
      {/* <Home /> */}
    </div>
  );
}

export default App;
