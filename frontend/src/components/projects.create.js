import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";

import UserService from "../services/user";
import { FormContext } from "../services/context"


function ProjectsCreate() {    
  const { register, formState: { errors }, handleSubmit, control, setValue} = useForm();  
  const { setData, setType} = useContext(FormContext);
  const [users_list, setUserList] = useState();
  
  
  React.useEffect(() => {
    const userList = [];
    UserService.getUsers().then(
      (data) => {
        for(let i=0; i < data.data.length; i++){
          let name = `${data.data[i].name} ${data.data[i].lastname}`;
          let value = data.data[i].id;
          let id = i;
          userList.push({name: name, value: value, id: id})
        }
        setUserList(userList);
      }
    );
  }, []);

  const onSubmit = data => {
    UserService.craeteProject(data.name, data.description, data.start_date, data.end_date, data.selectuser)
    .then(
      (data) =>{
        console.log(data)
      }
    )
    setData(data);
    setType('projects');
  };

  return (
    <div className="container">
      <h2>Create project</h2>
      <hr/ >
      <div className="card card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input {...register("name", { required: "Name is required" })} type="text" className="form-control" />
            <p className="text-danger">{errors.name?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="description ">Description</label>
            <textarea {...register("description", { required: "Description is required",})}  className="form-control" />
            <p className="text-danger">{errors.description?.message}</p>
          </div>
          <div className="mb-3">
              <label htmlFor="start_date">Start date</label>
              <input {...register("start_date", { required:  "Select start date"})}  type="date" className="form-control"  />
              <p className="text-danger">{errors.start_date?.message}</p>
          </div>
          <div className="mb-3">
              <label htmlFor="end_date">End date</label>
              <input {...register("end_date", { required:  "Select end date"})}  type="date" className="form-control"  />
              <p className="text-danger">{errors.end_date?.message}</p>
          </div>
          <div className="mb-3">
          <label htmlFor="selectuser">Select users</label>
          <Controller
            name="selectuser"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => {
              return (
                <Multiselect
                  {...field}
                  inputRef={ref}
                  displayValue="name"
                  onSelect={(selected, item) => {
                    setValue("selectuser", selected);
                  }}
                  onRemove={(selected, item) => {
                    setValue("selectuser", selected);
                  }}
                  options={users_list}
                />
              );
            }}
          />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary float-end">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectsCreate;