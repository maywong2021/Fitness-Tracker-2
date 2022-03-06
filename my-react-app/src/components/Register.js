import { useState } from "react";
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = ({
    setToken
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { token } = await register(username, password);
            setToken(token);
            localStorage.setItem("token", token);
            setUsername("");
            setPassword("");
            navigate('/');

        } catch(error){
          console.error(error);
        }
    }

    return (
        <>
        <h2 className="mb-5 mt-5 px-5 ">Register</h2>
        <form className="user-wrapper pt-5" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
            <input className="login-input" value={username} onChange={(event) => {setUsername(event.target.value)}} type="username" class="form-control" id="floatingPassword" placeholder="Username" minLength="6" maxLength="12"></input>
            <label for="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-5 mt-5">
            <input value={password} onChange={(event) => {setPassword(event.target.value)}} type="password" class="form-control" id="floatingPassword" placeholder="Password" minLength="6"></input>
            <label for="floatingPassword">Password</label>
        </div>
        <button className="btn routines-header-create-btn px-5">Register</button>
        </form>
        </>
    )
}

export default Register;