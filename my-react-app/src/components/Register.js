import { useState } from "react";
import { register } from '../api';

const Register = ({
    setToken
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newToken = await register(username, password);
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setUsername("");
        setPassword("");
    }

    return (
        <form className="resgister-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input value={username} placeholder="username" onChange={(event) => {setUsername(event.target.value)}} minLength="6" maxLength="12"/>
            <input type='password' placeholder="password" value={password} onChange={(event) => {setPassword(event.target.value)}} minLength="6"/>
            <button className='button'>Submit</button>
        </form>
    )
}

export default Register;