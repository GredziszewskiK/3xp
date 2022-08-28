import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit";

import UserService from "../services/user";


function ProjectDelete() {
    let { id } = useParams();
    const [data, setData] = useState()
    let navigate = useNavigate();

    React.useEffect(() => {
      UserService.getProject(id).then(
        (data) => {        
          setData(data.data);
        }
      );
    }, [id, setData,]);

    function submit() {
      UserService.deleteProject(id).then(
        () => {
          navigate('/projects');
        }
      );
    }

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
                      <div className="label">Confirm before you delete a project.</div>
                    </div>

                    <div className="mb-3">
                      <button onClick={() => navigate(-1)} className="btn btn-primary float-start">BACK</button>
                      <button onClick={() => submit()} className="btn btn-primary float-end">Confirm</button>
                    </div>

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

export default ProjectDelete