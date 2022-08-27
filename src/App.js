import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import AuthService from "./services/auth";
import { FormContext, UserContext } from './services/context';

import Login from "./components/login";
import Logout from "./components/logout";
import Nav from "./components/nav";
import Profile from "./components/profile";
import Register from "./components/register";
import Projects from "./components/projects";
import ProjectsCreate from "./components/projects.create";
import ProjectsDetails from "./components/projects.detail";


function App() {
  const user = AuthService.getCurrentUser();  
  const [authenticated, setAuthenticated] = useState(user ? true : false);
  const [userid, setUserId] = useState(user ? user.id : '');
  const [username, setUserName] = useState(user ? user.name : '')
  const [data, setData] = useState()
  const [type, setType] = useState()
  let navigate = useNavigate();
  let url = useLocation();
  React.useEffect(() => {
    if (!authenticated && url.pathname !== '/register') {
      navigate('/login');
    }
  }, [authenticated, url.pathname, navigate]);
  return (
    <UserContext.Provider value={{authenticated, setAuthenticated, username, setUserName, userid, setUserId}}>
    <FormContext.Provider value={{data, setData, type, setType }}> 
      <div className="container-fluid">
        {authenticated && <Nav />}  
        <Routes>
          <Route path={"/"} element={<Projects/>} />
          <Route path="/home" element={<Projects/>}/>
          <Route path="/profile/*" element={<Profile/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<ProjectsCreate />} />
          <Route path="/projects/details/:id" element={<ProjectsDetails />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
      </FormContext.Provider>
    </UserContext.Provider>
  );
}

export default App;