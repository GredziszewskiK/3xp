import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../services/context';


function Nav() {
  const  { authenticated, username } = useContext(UserContext)


  return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">       
        <Link to={"/"} className="navbar-brand">3xP</Link>
        {authenticated ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">{username} your profile</Link>
            </li>
            <li className="nav-item">
              <Link to={"/projects"} className="nav-link">Projects</Link>
            </li>
            <li className="nav-item">
              <Link to={"/logout"} className="nav-link">Logout</Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">Sign Up</Link>
            </li>
          </div>
        )}
      </nav>
  );
}

export default Nav