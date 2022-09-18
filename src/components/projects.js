import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit"
import { Plus, Pencil, Trash, SearchHeart } from "react-bootstrap-icons";
import Moment from 'moment';

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
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Projects</h1>
        </div>
      {data ?
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><Link to={"/project/create"} className="nav-link">Create project<Plus /></Link></h5>
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
                        <td>{Moment(val.start_date).format("DD.MM.YYYY")}</td>
                        <td>{Moment(val.end_date).format("DD.MM.YYYY")}</td>
                        <td>{val.state}</td>
                        <td>
                        <Link to={"/project/details/"+val.id} className="nav-link"><SearchHeart /></Link>
                        <Link to={"/project/edit/"+val.id} className="nav-link"><Pencil /></Link>
                        <Link to={"/project/delete/"+val.id} className="nav-link"><Trash /></Link>
                        </td>
                      </tr>
                      )
                    })
                  } 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      :
        <div className="spinner">  
          <RainbowSpinner size={50} color="purple"  loading={true} />
        </div>
      }
      </main>
    </div>
  );
};

export default Projects