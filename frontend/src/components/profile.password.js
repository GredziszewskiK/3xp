import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import AuthService from "../services/auth";


function ProfilePassword() {    
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const password = useRef({});
  let navgiate = useNavigate()
  password.current = watch("password", "");

  const onSubmit = data => {
    console.log(data)
    AuthService.setPassword(data.password).then(
      () => {
        navgiate('/profile')
      },
      error => {
        console.log(error)
      }
    );
  };

  return (
    <div className="container">
      <h2>Change password</h2>
      <hr/ >
      <div className="card card-container">      
        <form onSubmit={handleSubmit(onSubmit)}>           
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input {...register("password", {minLength: {value: 8, message: 'Password has at least 8 characters'}, required: "Password is required" })} type="password" className="form-control" />
            <p className="text-danger">{errors.password?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="repeat_password">Repeat password</label>
            <input {...register("repeat_password", { required: "Repeat your password", validate: value => value === password.current || "The password do not match"})} type="password" className="form-control" />
            <p className="text-danger">{errors.repeat_password?.message}</p>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary float-end">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePassword;