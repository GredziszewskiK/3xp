import React, { useContext, useEffect } from "react";
import {Navigate} from 'react-router-dom';
import AuthService from "../services/auth";
import { UserContext } from '../services/context';


function Logout() {
  const { setAuthenticated, } = useContext(UserContext);
  AuthService.logout();
  useEffect(() => {
    setAuthenticated(true);
  }, [setAuthenticated]);
  setAuthenticated(false);
  return (
    <Navigate to="/login" />
  );
};

export default Logout