import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.js";
import {
  Login,
  Register,
  Activities,
  ActivityForm,
  Routines,
  RoutineForm,
  RoutineActivityForm,
  RoutinesByUserName,
  RoutinesByActivity,
  MyRoutines,

} from "./components";
import { getUser } from "./api";

function App() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedRoutineActivity, setSelectedRoutineActivity] = useState(null);

  const [token, setToken] = useState("");
  console.log("token", token);
  const [user, setUser] = useState("");

  console.log("user", user);

  useEffect(() => {
    const handleUser = async () => {
      if (token) {
        const userInfo = await getUser(token);
        console.log("... user data", userInfo);
        setUser(userInfo);
      }
    };

    handleUser();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="App">
      <nav className="nav">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="activities">
          Activites
        </Link>
        <Link className="link" to="routines">
          Routines
        </Link>
        {token ? (
          <Link className="link" to="my-routines">
            My Routines
          </Link>
        ) : null}
        {token ? null : (
          <Link className="link" to="register">
            Register
          </Link>
        )}
        {token ? (
          <Link
            className="link"
            to="/"
            onClick={() => {
              setToken("");
              localStorage.removeItem("token");
              // need to clear user state
              setUser(null);
            }}
          >
            Logout
          </Link>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </nav>
      {token? <h2 className="m-5">Hello, {user?.username}!</h2> : <h2> </h2>} 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/routines"
          element={
            <Routines
              userInfo={user}
              setSelectedRoutineActivity={setSelectedRoutineActivity}
              setSelectedRoutine={setSelectedRoutine}
            />
          }
        />
        <Route
          path="/my-routines"
          element={
            <MyRoutines
              userInfo={user}
              setSelectedRoutineActivity={setSelectedRoutineActivity}
              setSelectedRoutine={setSelectedRoutine}
            />
          }
        />
        <Route
          path="/routines/form"
          element={<RoutineForm routineInfo={selectedRoutine} />}
        />

        <Route path="/routines/by/:username" element={<RoutinesByUserName />} />
        <Route
          path="/routines/by/:activityId/:activityName"
          element={<RoutinesByActivity />}
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
          element={
            <Activities
              setSelectedActivity={setSelectedActivity}
              userInfo={user}
            />
          }
        />
        <Route
          path="/activities/form"
          element={<ActivityForm activityInfo={selectedActivity} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
