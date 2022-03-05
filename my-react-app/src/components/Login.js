import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log("username", username);
  console.log("password", password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token, user } = await login(username, password);
      console.log(token);
      setToken(token);
      // set the user state after login
      setUser(user);
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.dir(error);
    }
  };


    if(!token) {
        return (
        <>
        <h2 className="mb-5 mt-5 px-5 ">Sign In</h2>
        <form className="user-wrapper pt-5" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
            <input className="login-input" value={username} onChange={(event) => {setUsername(event.target.value)}} type="username" class="form-control" id="floatingPassword" placeholder="Username"></input>
            <label for="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-5 mt-5">
            <input value={password} onChange={(event) => {setPassword(event.target.value)}} type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
            <label for="floatingPassword">Password</label>
        </div>
        <button className="btn routines-header-create-btn px-5">Sign In</button>
        </form>
        </>
        )
    } 
}

export default Login;
