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
    <div className="tab-pane fade show profile-overview" id="profile-overview">
      <h5 className="card-title">Change password</h5>
      <form onSubmit={handleSubmit(onSubmit)}>           
        <div className="row mb-3">
          <label htmlFor="password" className="col-md-4 col-lg-3 col-form-label">Password</label>
          <div className="col-md-8 col-lg-9">
            <input {...register("password", {minLength: {value: 8, message: 'Password has at least 8 characters'}, required: "Password is required" })} type="password" className="form-control" />
            <p className="text-danger">{errors.password?.message}</p>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="repeat_password" className="col-md-4 col-lg-3 col-form-label">Repeat password</label>
          <div className="col-md-8 col-lg-9">
            <input {...register("repeat_password", { required: "Repeat your password", validate: value => value === password.current || "The password do not match"})} type="password" className="form-control" />
            <p className="text-danger">{errors.repeat_password?.message}</p>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary float-end">Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePassword;