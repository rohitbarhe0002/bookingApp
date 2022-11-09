import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";
function Navbar() {
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

const handleLogOut = () => {
  dispatch({ type: "LOGOUT" });
  navigate("/")
}
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
       
        <span className="logo">bookMyhotel</span>
        </Link>
    {  user  ?  <button className="navButton" onClick={handleLogOut}>Log out</button> :( <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton" onClick={()=>navigate("/login")}>Login</button>
        </div>)}
      </div>
    </div>
  );
}

export default Navbar;
