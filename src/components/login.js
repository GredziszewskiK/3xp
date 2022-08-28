import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';

import AuthService from "../services/auth";
import { UserContext } from '../services/context';

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const { authenticated, setAuthenticated, setUser, setUserId } = useContext(UserContext)
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
        setUser({name: user.name, lastname: user.lastname, age: user.age});
        setUserId(user.id);
        setAuthenticated(true);
        navigate('/');
      },
      error => {
        console.log(error)
        setAuthenticated(false);
        setErrorMessages(error.message);
      }
    );
  };

  return (
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

            <div className="d-flex justify-content-center py-4">
              <Link to={"/"} className="logo d-flex align-items-center w-auto">
                <img src="cookie.png" alt="" />
                <span className="d-none d-lg-block">3xP</span>
              </Link>
            </div>

            <div className="card mb-3">
              <div className="card-body">

                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                  <p className="text-center small">Enter your email & password to login</p>
                </div>       

                {Object.keys(errorMessages).length > 0 && 
                  (<div className="alert alert-danger">{errorMessages}</div>)
                }

                <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                  
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <input type="text" name="email" className="form-control" id="email" required />
                      <div className="invalid-feedback">Please enter your username.</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="yourPassword" required />
                    <div className="invalid-feedback">Please enter your password!</div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                  </div>
                  
                  <div className="col-12">
                    <p className="small mb-0">Don't have account? <Link to={"/register"}>Create an account</Link></p>
                  </div>
                
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;