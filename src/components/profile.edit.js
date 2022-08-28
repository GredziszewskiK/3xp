import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { RainbowSpinner,} from "react-spinners-kit"

import { FormContext } from "../services/context";

const vemail = value => {
  if (!isEmail(value)) {
    return (
        "This is not a valid email."
    );
  }
};

function ProfileEdit() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { data, setData, type, } = useContext(FormContext)
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!data || type !== 'profile') {
      navigate('/profile');
    };
  }, [data, type, navigate]);

  const onSubmit = data => {
    setData(data);
    navigate('/profile/edit/confirm')
  };  

  return (
    <div>
      {data ?
        <div className="tab-pane fade show profile-edit" id="profile-edit">
          <h5 className="card-title">Profile Edit</h5>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row mb-3">
              <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
              <div className="col-md-8 col-lg-9">
                <input {...register("email", { required: "Email is required", value: data.email, validate: v=> vemail(v)})} type="text" className="form-control" />
                <div className="text-danger">{errors.email?.message}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">Name</label>
              <div className="col-md-8 col-lg-9">
                <input {...register("name", { required: "Name is required", value: data.name })} type="text" className="form-control" />
                <div className="text-danger">{errors.name?.message}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="lastname" className="col-md-4 col-lg-3 col-form-label">Lastname</label>
              <div className="col-md-8 col-lg-9">
                <input {...register("lastname", { required: "Lastname is required", value: data.lastname })} type="text" className="form-control" />
                <div className="text-danger">{errors.lastname?.message}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="dob" className="col-md-4 col-lg-3 col-form-label">Day of birth</label>
              <div className="col-md-8 col-lg-9">
                <input {...register("dob", { required:  "Day of birth is required", value: data.dob})}  type="date" className="form-control"  />
                <div className="text-danger">{errors.dob?.message}</div>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="sex" className="col-md-4 col-lg-3 col-form-label">Sex</label>
              <div className="col-md-8 col-lg-9">
                <select {...register("sex", {value: data.sex})} className="form-select" >
                  <option value="FAMALE">Famale</option>
                  <option value="MALE">Male</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">Phone number</label>
              <div className="col-md-8 col-lg-9">
                <input {...register("phone", {value: data.phone})}  type="tel" className="form-control" />
              </div>
            </div>

            <div className="mb-3">
              <button onClick={() => navigate(-1)} className="btn btn-primary float-start">BACK</button>
              <button type="submit" className="btn btn-primary float-end">OK</button>
            </div>

          </form>
        </div>
      :
      <div className="spinner">  
        <RainbowSpinner size={50} color="purple"  loading={true} />
      </div>
      }
    </div>
  );
};

export default ProfileEdit