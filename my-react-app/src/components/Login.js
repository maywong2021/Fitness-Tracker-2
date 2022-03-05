import { useState } from "react";
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = ({
    token, 
    setToken
}) => {

    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();
    console.log("username", username);
    console.log("password", password);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { token, user } = await login(username, password);
            console.log(token);
            setToken(token);
            localStorage.setItem("token", token);
            setUsername("");
            setPassword("");
            navigate('/');
        } catch(error){
          console.dir(error);
        }
    }

    if(!token) {
        return (
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input value={username} placeholder="username" onChange={(event) => {setUsername(event.target.value)}} />
                <input type='password' value={password} placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
                <button>Login</button>
            </form>
        )
    } 
}

export default Login;