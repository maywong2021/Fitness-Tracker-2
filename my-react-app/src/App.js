import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Routines,
  Activites,
  Login,
  Register
} from './components'


function App() {
  return (
    <div className="App">
      <nav className='nav'>
            
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Home />
    </div>
  );
}

export default App;
