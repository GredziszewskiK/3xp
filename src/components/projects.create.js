import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";

import UserService from "../services/user";
import { FormContext } from "../services/context"


function ProjectsCreate() {    
  const { register, formState: { errors }, handleSubmit, control, setValue} = useForm();  
  const { data, type, setData, setType} = useContext(FormContext);
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
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Projects</h1>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">New project</h5>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row mb-3">
                  <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">Name</label>
                  <div className="col-md-8 col-lg-9">
                    <input {...register("name", { required: "Name is required" })} type="text" className="form-control" />
                    <div className="text-danger">{errors.name?.message}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="description" className="col-md-4 col-lg-3 col-form-label">Description</label>
                  <div className="col-md-8 col-lg-9">
                    <textarea {...register("description", { required: "Description is required",})}  className="form-control" />
                    <div className="text-danger">{errors.description?.message}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="start_date" className="col-md-4 col-lg-3 col-form-label">Start date</label>
                  <div className="col-md-8 col-lg-9">
                    <input {...register("start_date", { required:  "Select start date"})}  type="date" className="form-control"  />
                    <div className="text-danger">{errors.start_date?.message}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="end_date" className="col-md-4 col-lg-3 col-form-label">End date</label>
                  <div className="col-md-8 col-lg-9">
                    <input {...register("end_date", { required:  "Select end date"})}  type="date" className="form-control"  />
                    <div className="text-danger">{errors.end_date?.message}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="selectuser" className="col-md-4 col-lg-3 col-form-label">Select users</label>
                  <div className="col-md-8 col-lg-9">
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
                </div>

           <div className="mb-3">
             <button type="submit" className="btn btn-primary float-end">Next</button>
           </div>
                
              </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectsCreate;