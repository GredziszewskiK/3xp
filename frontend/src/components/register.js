import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
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

function Register() {    
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const password = useRef({});
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
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="profile-img-card bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input {...register("email", { required: "Email is required", validate: v=> vemail(v)})} type="text" className="form-control" />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input {...register("name", { required: "Name is required" })} type="text" className="form-control" />
            <p className="text-danger">{errors.name?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="lastname">Lastname</label>
            <input {...register("lastname", { required: "Lastname is required" })} type="text" className="form-control" />
            <p className="text-danger">{errors.lastname?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input {...register("password", { required: "Password is required" })} type="password" className="form-control" />
            <p className="text-danger">{errors.password?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="repeat_password">Repeat password</label>
            <input {...register("repeat_password", {minLength: {value: 8, message: 'Password has at least 8 characters'}, required: "Repeat your password", validate: value => value === password.current || "The password do not match"})} type="password" className="form-control" />
            <p className="text-danger">{errors.repeat_password?.message}</p>
          </div>    
          <div className="mb-3">
            <label htmlFor="dob">Day of birth</label>
            <input {...register("dob", { required:  "Day of birth is required"})} type="date" className="form-control"  />
            <p className="text-danger">{errors.dob?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="sex">Sex</label>
            <select {...register("sex")} className="form-select" >
              <option value="FAMALE">Famale</option>
              <option value="MALE">Male</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone number</label>
            <input {...register("phone")} type="tel" className="form-control" />
          </div>     
          <div className="mb-3">
            <button type="submit" className="btn btn-primary float-end">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;