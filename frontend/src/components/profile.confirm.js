import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit"

import { FormContext } from "../services/context";
import UserService from "../services/user";


function ProfileCofirm() {
  const { data, setData, type, setType } = useContext(FormContext)
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!data || type !== 'profile') {
      navigate('/profile');
    };
  }, [data, type, navigate]);

  function submit() {
    const phone = data.phone ? data.phone : null
    UserService.editUser(data.email, data.name, data.lastname, data.sex, phone, data.dob);
    navigate('/profile')
  };  

  function cancel() {
    setData(null);
    setType(null);
    navigate('/profile');
  }  

  return (
    <div className="container ">  
      <h2>Confirm profile edit</h2>  
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
              <td>Day of birth</td>
              <td>{data.dob}</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>{data.sex}</td>
            </tr>
          </tbody>
        </table>            
        <div className="mb-3">
          <button onClick={() => navigate(-1)} className="btn btn-primary float-start">Back</button>
          <button onClick={() => cancel()} className="btn btn-primary float-start">Cancel</button>
          <button onClick={() => submit()} className="btn btn-primary float-end">Commit</button>
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

export default ProfileCofirm