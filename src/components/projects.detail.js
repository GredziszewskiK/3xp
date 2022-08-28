import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit"

import UserService from "../services/user";

function ProjectsDetails() {
  let { id } = useParams(); 
  const [data, setData] = useState()
  React.useEffect(() => {
    UserService.getProject(id).then(
      (x) => {
        
        setData(x.data);
      }
    );
  }, [id, setData,]);

  return (
    <div>
      {data ?
      <div>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Projects</h1>
          </div>
          <section className="section profile">
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
                    <div className="col-lg-9 col-md-8">{data.start_date}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">End date:</div>
                    <div className="col-lg-9 col-md-8">{data.end_date}</div>
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
                  </div>

                </div>
              </div>
            </div>
          </div>
          </section>
        </main>
      </div>
      :
      <div className="spinner">  
        <RainbowSpinner size={50} color="purple"  loading={true} />
      </div>
      }
    </div>
  );
};

export default ProjectsDetails