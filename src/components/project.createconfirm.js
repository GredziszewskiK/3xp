import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit"
import Moment from 'moment';

import { ProjectContext } from "../services/context";
import UserService from "../services/user";


function ProjectCreateCofirm() {
  const { project } = useContext(ProjectContext)
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!project) {
      navigate('/project/create');
    };
  }, [project, navigate]);

  function submit() {
    UserService.craeteProject(project.name, project.description, project.start_date, project.end_date, project.users_list)
    .then(
      (data) =>{
        navigate('/projects')
      }
    )
  };

  function cancel() {
    navigate('/projects');
  }  

  return (
    <div>
    {project ?      
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">  
              <div className="tab-pane fade show profile-overview" id="profile-overview">

                <h5 className="card-title">Confirm create project</h5>

                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Name</div>
                  <div className="col-lg-9 col-md-8">{project.name}</div>
                </div>  

                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Description</div>
                  <div className="col-lg-9 col-md-8">{project.description}</div>
                </div>

                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Start date</div>
                  <div className="col-lg-9 col-md-8">{Moment(project.start_date).format("DD.MM.YYYY")}</div>
                </div>

                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">End date</div>
                  <div className="col-lg-9 col-md-8">{Moment(project.end_date).format("DD.MM.YYYY")}</div>
                </div>

                <div className="row">
                  <div className="col-lg-3 col-md-4 label ">Users</div>
                  <div className="col-lg-9 col-md-8">
                  {
                    project.users_list.map((val, key) => {
                      return (
                      <p key={key}>{val.name}</p>
                      )
                    })
                  } 
                  </div>
                </div>        

                <div className="mb-3">
                  <button onClick={() => navigate(-1)} className="btn btn-primary float-start">Back</button>
                  <button onClick={() => cancel()} className="btn btn-primary float-start">Cancel</button>
                  <button onClick={() => submit()} className="btn btn-primary float-end">Commit</button>
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
};

export default ProjectCreateCofirm