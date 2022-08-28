import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit";
import { PersonHearts } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import Moment from 'moment';

import UserService from "../services/user";

function ProjectDetails(){
  let { id } = useParams();
  const [data, setData] = useState()

  React.useEffect(() => {
    UserService.getProject(id).then(
      (data) => {        
        setData(data.data);
      }
    );
  }, [id, setData,]);

  const { register, formState: { errors }, handleSubmit} = useForm();  
  const onSubmit = data => {
    UserService.addComment(id, data.description).then(
      (data) => {
        setData(data.data);
      }
    )
  };

  return (
    <div>
      {data ?
      <div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="tab-pane fade show profile-overview">
                  <h5 className="card-title">Project name: {data.name}</h5>
                                      
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Description:</div>
                    <div className="col-lg-9 col-md-8">{data.description}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Start date:</div>
                    <div className="col-lg-9 col-md-8">{Moment(data.start_date).format("DD.MM.YYYY")}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">End date:</div>
                    <div className="col-lg-9 col-md-8">{Moment(data.end_date).format("DD.MM.YYYY")}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">State:</div>
                    <div className="col-lg-9 col-md-8">{data.state}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Users:</div>
                    <div className="col-lg-9 col-md-8">
                    {
                      data.users_list.map((val, key) => {
                        return (
                          <p key={key}>{val.name}</p>
                        )
                      })
                    }  
                    </div>
                  </div>
                  
                  <h5 className="card-title">Comments:</h5>
                  {
                    data.comments_list.map((val, key) => {
                      return (
                        <div className={(val.owner_id === val.project_owner_id ? "row comment-owner": "row")} key={key}>
                          <div className="col-lg-3 col-md-4 label ">{val.owner_name} {val.owner_id === val.project_owner_id && <PersonHearts/>}</div>
                          <div className="col-lg-3 col-md-8">{Moment(val.created).format("DD.MM.YYYY HH:mm:ss")}</div>
                          <div className="col-lg-6 col-md-8">{val.content}</div>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="tab-pane fade show profile-overview">
                  <h5 className="card-title">Add comment:</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mb-3">
                        <div className="col-lg-12">
                          <textarea {...register("description", { required: "Fild is required"})} type="text" className="form-control" />
                          <div className="text-danger">{errors.description?.message}</div>
                        </div>                          
                      </div>
                      <div className="mb-3">
                        <button type="submit" className="btn btn-primary float-end">Add</button>
                      </div>
                    </form>
                </div>
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

export default ProjectDetails
