import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit"

import UserService from "../services/user";

function Projects() {
  const [data, setData] = useState()

  React.useEffect(() => {
    UserService.getProjects().then(
      (x) => {
        setData(x.data);
      }
    );
  }, []);

  return (
    <div className="container ">
      <h2>Projects</h2>  
      <hr/> 
      <div>
        <Link to={"/projects/create"} className="nav-link">Create project</Link>        
      </div> 
      <hr/>
      {data ?
      <div className="row justify-content-md-center">
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">State</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
          <tbody>
              {
                data.map((val, key) => {
                  return (
                  <tr key={key}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.start_date}</td>
                    <td>{val.end_date}</td>
                    <td>{val.state}</td>
                    <td>
                    <Link to={"/projects/details/"+val.id} className="nav-link">Details</Link>
                    <Link to={"/projects/edit/"+val.id} className="nav-link">Edit</Link>
                    <Link to={"/projects/delete/"+val.id} className="nav-link">Delete</Link>
                    </td>
                  </tr>
                  )
                })
              }    
          </tbody>
        </table>
      </div>
      : 
      <div className="spinner">  
        <RainbowSpinner size={50} color="purple"  loading={true} />
      </div>
      }
    </div>
  );
};

export default Projects