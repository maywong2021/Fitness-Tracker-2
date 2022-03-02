import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Activities, ActivityForm } from "./components";

function App() {
  return (
    <div className="App">
      <nav className="nav"></nav>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/routines" element={<Routines />} /> */}
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/create" element={<ActivityForm />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
      {/* <Home /> */}
    </div>
  );
}

export default App;
