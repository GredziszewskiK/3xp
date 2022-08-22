import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit"

import UserService from "../services/user";
import { FormContext } from "../services/context";

function Profile() {
  const { data, setData, setType} = useContext(FormContext)
  React.useEffect(() => {
    UserService.getProfile().then(
      (data) => {
        setData(data);
        setType('profile');
      }
    );
  }, [setData, setType]);

  return (
    <div className="container ">
      <h2>Profile</h2>  
      <hr/>  
      {data ?
      <div className="row justify-content-md-center">
        <table className="table">
          <tbody>
            <tr>
              <td>Email</td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{data.lastname}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{data.phone}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{data.age}</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>{data.sex}</td>
            </tr>
          </tbody>
        </table>
        <Link to={"/profile/edit"} className="nav-link text-success">Edit</Link>
        <Link to={"/profile/password"} className="nav-link text-success">Edit password</Link>
      </div>
      : 
      <div className="spinner">  
        <RainbowSpinner size={50} color="purple"  loading={true} />
      </div>
      }
    </div>
  );
};

export default Profile