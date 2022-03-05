import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
// import Routines from './components/Routines.js';
// import Activiites from './components/Activities.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { getUser } from './api';


function App() {

  const [token, setToken] = useState('');
  console.log('token', token);
  const [user, setUser] = useState('');

  console.log('user', user);

  useEffect(() => {

    const handleUser = async () => {
      if(token) {
        const username = await getUser(token);
        setUser(username);
      }
    }

    handleUser();
  }, [token])

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    
  }, [])

  return (
    <div className="App">
      <nav className='nav'>
      <Link className ="link" to='/'>Home</Link>
      <Link className ="link" to='activities'>Activites</Link>
      <Link className ="link" to='routines'>Routines</Link>
      {token? <Link className ="link" to='my-routines'>My Routines</Link> : null}
      {token? null : <Link className ="link" to='register'>Register</Link>}
      {token? <Link className ="link" to='/' onClick={()=> {
        setToken('');
        localStorage.removeItem("token");
      }}>Logout</Link> : 
      <Link className ="link" to='/login'>Login</Link>}
      </nav>
      {token && <h2>Hello, {user}!</h2>}
      
      <Routes>
        <Route path="/" element={<Home />}/> 
        {/* <Route path="/routines" element={<Routines />} /> */}
        {/* <Route path="/my-routines" element={<MyRoutines token={token} setToken={setToken}/>} /> */}
        {/* <Route path="/activities" element={<Activites />} /> */}
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/register" element={<Register token={token} setToken={setToken}/>} />
      </Routes>
    </div>
  );
}

export default App;
