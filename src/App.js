import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import AuthService from "./services/auth";
import { UserContext } from './services/context';

import Login from "./components/login";
import Logout from "./components/logout";
import Nav from "./components/nav";
import Profile from "./components/profile";
import Register from "./components/register";
import Projects from "./components/projects";
import Project from "./components/project";

function App() {
  const _user = AuthService.getCurrentUser();  
  const [authenticated, setAuthenticated] = useState(_user ? true : false);
  const [userid, setUserId] = useState(_user ? _user : '');
  const [user, setUser] = useState(_user ? _user : '')
  let navigate = useNavigate();
  let url = useLocation();
  React.useEffect(() => {
    if (!authenticated && url.pathname !== '/register') {
      navigate('/login');
    }
  }, [authenticated, url.pathname, navigate]);
  return (
    <UserContext.Provider value={{authenticated, setAuthenticated, user, setUser, userid, setUserId}}>
      <div className="container-fluid">
        {authenticated && <Nav />}  
        <Routes>
          <Route path={"/"} element={<Projects/>} />
          <Route path="/home" element={<Projects/>}/>
          <Route path="/profile/*" element={<Profile/>} />
          <Route path="/project/*" element={<Project/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;