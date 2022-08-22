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

    <div className="container ">
      <h2>Edit profile</h2>
      <hr/>
      {data ?
      <div className="col-md-12">
        <div className="card card-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input {...register("email", { required: "Email is required", value: data.email, validate: v=> vemail(v)})} type="text" className="form-control" />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input {...register("name", { required: "Name is required", value: data.name })} type="text" className="form-control" />
              <p className="text-danger">{errors.name?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="lastname">Lastname</label>
              <input {...register("lastname", { required: "Lastname is required", value: data.lastname })} type="text" className="form-control" />
              <p className="text-danger">{errors.lastname?.message}</p>
            </div>   
            <div className="mb-3">
              <label htmlFor="dob">Day of birth</label>
              <input {...register("dob", { required:  "Day of birth is required", value: data.dob})}  type="date" className="form-control"  />
              <p className="text-danger">{errors.dob?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="sex">Sex</label>
              <select {...register("sex", {value: data.sex})} className="form-select" >
                <option value="FAMALE">Famale</option>
                <option value="MALE">Male</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone number</label>
              <input {...register("phone", {value: data.phone})}  type="tel" className="form-control" />
            </div>     
            <div className="mb-3">
              <button onClick={() => navigate(-1)} className="btn btn-primary float-start">BACK</button>
              <button type="submit" className="btn btn-primary float-end">OK</button>
            </div>
          </form>
        </div>
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