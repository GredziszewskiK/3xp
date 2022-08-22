import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/auth";
import { UserContext } from '../services/context';

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const { authenticated, setAuthenticated, setUserName, setUserId } = useContext(UserContext)
  let navigate = useNavigate();
  React.useEffect(() => {
    if (authenticated) {    
      navigate('/');
    }
  }, [authenticated, navigate]); 

  const handleSubmit = (event) => {
    event.preventDefault();

    var { email, password } = document.forms[0];

    AuthService.login(email.value, password.value).then(
      () => {
        const user = AuthService.getCurrentUser();
        setUserName(user.name);
        setUserId(user.id);
        setAuthenticated(true);
        navigate('/');
      },
      error => {
        setAuthenticated(false);
        setErrorMessages(error.response.data.detail);
      }
    );
  };

  return (
    <div className="col-md-12">    
      <div className="card card-container">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="profile-img-card bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
        <form onSubmit={handleSubmit}> 
          {Object.keys(errorMessages).length > 0 && 
            (<div className="alert alert-danger">{errorMessages}</div>)
          }
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" required />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary float-end">Log in</button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default Login;