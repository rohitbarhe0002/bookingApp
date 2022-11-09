import axios from "axios";
import e from "cors";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/context/AuthContext";
import "./login.css";

function Login() {
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        credential
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/home")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  console.log(user, "user is here");
  return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="loginInput"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="loginInput"
        />
        <button className="loginButton" onClick={handleClick}>
         Logi in
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
