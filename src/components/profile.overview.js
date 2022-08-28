import React, { useState } from "react";
import { RainbowSpinner,} from "react-spinners-kit"

import UserService from "../services/user";

function ProfileOverview() {
  const [data, setData] = useState()
  React.useEffect(() => {
    UserService.getProfile().then(
      (data) => {
        setData(data);
      }
    );
  }, [setData]);

  return (
    <div>
        {data ?        
          <div className="tab-pane fade show profile-overview" id="profile-overview">

            <h5 className="card-title">Profile Details</h5>

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
              
          </div>
        :
        <div className="spinner">  
          <RainbowSpinner size={50} color="purple"  loading={true} />
        </div>
        }
    </div>
  );
};

export default ProfileOverview