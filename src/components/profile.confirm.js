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
      navigate('/profile/overview');
    };
  }, [data, type, navigate]);

  function submit() {
    const phone = data.phone ? data.phone : null
    UserService.editUser(data.email, data.name, data.lastname, data.sex, phone, data.dob);
    navigate('/profile/overview')
  };  

  function cancel() {
    setType(null);
    navigate('/profile/overview');
  }  

  return (
    <div>
    {data ?        
      <div className="tab-pane fade show profile-overview" id="profile-overview">

        <h5 className="card-title">Confirm profile edit</h5>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Email</div>
          <div className="col-lg-9 col-md-8">{data.email}</div>
        </div>  

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Name</div>
          <div className="col-lg-9 col-md-8">{data.name}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Lastname</div>
          <div className="col-lg-9 col-md-8">{data.lastname}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Sex</div>
          <div className="col-lg-9 col-md-8">{data.sex}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">phone</div>
          <div className="col-lg-9 col-md-8">{data.phone}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Day of Birth</div>
          <div className="col-lg-9 col-md-8">{data.dob}</div>
        </div>

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