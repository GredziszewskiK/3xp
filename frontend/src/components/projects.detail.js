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
    <div className="container ">
      <h2>Project name: {data ? data.name:'-'}</h2>  
      <hr/> 
      {data ? 
        <table className="table">
          <tbody>
            <tr>
              <td>Description</td>
              <td>{data.description}</td>
            </tr>
            <tr>
              <td>Start date</td>
              <td>{data.start_date}</td>
            </tr>
            <tr>
              <td>End date</td>
              <td>{data.end_date}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{data.state}</td>
            </tr>
            <tr>
              <td>Users</td>
              <td>
              {
                data.users_list.map((val, key) => {
                  return (
                  <p key={key}>{val.name}</p>
                  )
                })
              }  
              </td>
            </tr>
          </tbody>
        </table>
      :
      <div className="spinner">  
        <RainbowSpinner size={50} color="purple"  loading={true} />
      </div>   
      }   
    </div>
  );
};

export default ProjectsDetails