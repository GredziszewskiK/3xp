import React, { useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { isEmail } from "validator";

import AuthService from "../services/auth";

const vemail = value => {
  if (!isEmail(value)) {
    return (
        "This is not a valid email."
    );
  }
};

const vage = value => {
  if (new Date(value).getFullYear() > new Date().getFullYear() - 18) {
    return (
        "You must be 18."
    );
  }
};

function Register() {    
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const password = useRef({});
  const [errorMessages, setErrorMessages] = useState({});
  let navgiate = useNavigate()

  password.current = watch("password", "");

  const onSubmit = data => {
    const phone = data.phone ? data.phone : null
    AuthService.register(data.email, data.name, data.lastname, data.sex, data.password, phone, data.dob).then(
      () => {
        navgiate('/login')
      },
      error => {
        console.log(error)
        if (error.response.status === 400) {
          if(error.response.data.hasOwnProperty('phone')){
            setErrorMessages(error.response.data.phone);
          } else {
          setErrorMessages(error.response.data);
          }
        } 
        if (error.response.status === 500) {
          setErrorMessages("Request failed with status code 500");
        }
      }
    );
  };

  return (
    <div className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            
            <div className="d-flex justify-content-center py-4">
              <Link to={"/"} className="logo d-flex align-items-center w-auto">
                <img src="cookie.png" alt="" />
                <span className="d-none d-lg-block">3xP</span>
              </Link>
            </div>

            <div className="card col-12"> 
              <div className="card-body">

                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                  <p className="text-center small">Enter your personal details to create account</p>
                  {Object.keys(errorMessages).length > 0 && 
                    (<div className="alert alert-danger">{errorMessages}</div>)
                  }
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input {...register("email", { required: "Email is required", validate: v=> vemail(v)})} type="text" className="form-control" />
                    <div className="text-danger">{errors.email?.message}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="name" className="from-label">Name</label>
                    <input {...register("name", { required: "Name is required", pattern: {value: /^[A-ZĄĘÓŁŃŻŹĆŚa-ząęółńżźćś]+$/i, message: 'name must contain only letters'}, maxLength: {value: 50, message: 'max length 50'} })} type="text" className="form-control" />
                    <div className="text-danger">{errors.name?.message}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="lastname">Lastname</label>
                    <input {...register("lastname", { required: "Lastname is required", pattern: {value: /^[A-ZĄĘÓŁŃŻŹĆŚa-ząęółńżźćś]+$/i, message: 'lastname must contain only letters'}, maxLength: {value: 50, message: 'max length 50'} })} type="text" className="form-control" />
                    <div className="text-danger">{errors.lastname?.message}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="password">Password</label>
                    <input {...register("password", { required: "Password is required" })} type="password" className="form-control" />
                    <div className="text-danger">{errors.password?.message}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="repeat_password">Repeat password</label>
                    <input {...register("repeat_password", {minLength: {value: 8, message: 'Password has at least 8 characters'}, maxLength: {value: 128, message: 'Max 128 characters'}, required: "Repeat your password", validate: value => value === password.current || "The password do not match"})} type="password" className="form-control" />
                    <div className="text-danger">{errors.repeat_password?.message}</div>
                  </div>   

                  <div className="col-12">
                    <label htmlFor="dob">Day of birth</label>
                    <input {...register("dob", { required:  "Day of birth is required", validate: value => vage(value) })} defaultValue="2000-01-01" type="date" className="form-control"  />
                    <div className="text-danger">{errors.dob?.message}</div>
                  </div> 

                  <div className="col-12">
                    <label htmlFor="sex">Sex</label>
                    <select {...register("sex")} className="form-select" >
                      <option value="FEMALE">Female</option>
                      <option value="MALE">Male</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="phone">Phone number</label>
                    <input {...register("phone")} type="tel" className="form-control" />
                  </div> 

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">Create Account</button>
                  </div>

                  <div className="col-12">
                    <p className="small mb-0">Already have an account? <Link to={"/login"}>Log in</Link></p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;