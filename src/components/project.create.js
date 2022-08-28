import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";
import { RainbowSpinner,} from "react-spinners-kit"

import UserService from "../services/user";
import { ProjectContext } from "../services/context"


function ProjectCreate() {    
  const { register, formState: { errors }, handleSubmit, control, setValue} = useForm();  
  const { project, setProject} = useContext(ProjectContext);
  const [users_list, setUserList] = useState();  
  let navigate = useNavigate();

  React.useEffect(() => {
    const usersList = [];
    UserService.getUsers().then(
      (data) => {
        for(let i=0; i < data.data.length; i++){
          let name = `${data.data[i].name} ${data.data[i].lastname}`;
          let value = data.data[i].id;
          usersList.push({name: name, value: value})
        }
        setUserList(usersList);
      }
    );
  }, []);

  const onSubmit = data => {
    setProject(data);
    navigate("/project/create/confirm")
  };

  return (
    <div>
      {users_list ?
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="tab-pane fade show profile-overview">
                  <h5 className="card-title">New project</h5>

                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row mb-3">
                      <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">Name</label>
                      <div className="col-md-8 col-lg-9">
                        <input {...register("name", { required: "Name is required", value: project ? project.name : null})} type="text" className="form-control" />
                        <div className="text-danger">{errors.name?.message}</div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="description" className="col-md-4 col-lg-3 col-form-label">Description</label>
                      <div className="col-md-8 col-lg-9">
                        <textarea {...register("description", { required: "Description is required", value: project ? project.description : null})}  className="form-control" />
                        <div className="text-danger">{errors.description?.message}</div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="start_date" className="col-md-4 col-lg-3 col-form-label">Start date</label>
                      <div className="col-md-8 col-lg-9">
                        <input {...register("start_date", { required:  "Select start date", value: project ? project.start_date : null})}  type="date" className="form-control"  />
                        <div className="text-danger">{errors.start_date?.message}</div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="end_date" className="col-md-4 col-lg-3 col-form-label">End date</label>
                      <div className="col-md-8 col-lg-9">
                        <input {...register("end_date", { required:  "Select end date", value: project ? project.end_date : null})}  type="date" className="form-control"  />
                        <div className="text-danger">{errors.end_date?.message}</div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="selectuser" className="col-md-4 col-lg-3 col-form-label">Select users</label>
                      <div className="col-md-8 col-lg-9">
                        <Controller
                          name="selectuser"
                          control={control}
                          rules={{ required: "Select users" }}
                          render={({ field: { ref, ...field } }) => {
                            return (
                              <Multiselect
                                {...field}
                                options={users_list}
                                // selectedValues={users_list} //Prawidłowo pokazuje ale wartość formularza się niezmienia
                                inputRef={ref}
                                displayValue="name"
                                onSelect={(selected, item) => {
                                  setValue("selectuser", selected);
                                }}
                                onRemove={(selected, item) => {
                                  setValue("selectuser", selected);
                                }}
                              />
                            );
                          }}
                        />
                        <div className="text-danger">{errors.selectuser?.message}</div>
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
        </div>
      :
      <div className="spinner">  
        <RainbowSpinner size={50} color="purple"  loading={true} />
      </div>
      }
    </div>
  )

}

export default ProjectCreate;