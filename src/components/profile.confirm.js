import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit";

import { ProfileContext, UserContext } from "../services/context";
import UserService from "../services/user";


function ProfileCofirm() {
  const { profile, setProfile } = useContext(ProfileContext)
  const { setUser } = useContext(UserContext)
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!profile) {
      navigate('/profile/overview');
    };
  }, [profile, navigate]);

  function submit() {
    const phone = profile.phone ? profile.phone : null;
    UserService.editUser(profile.email, profile.name, profile.lastname, profile.sex, phone, profile.dob).then(
      (data) => {
        setUser({name: data.data.name, lastname: data.data.lastname, age: data.data.age});
        navigate('/profile/overview');
      }
    );    
  };  

  function cancel() {
    setProfile(null);
    navigate('/profile/overview');
  }  

  return (
    <div>
    {profile ?        
      <div className="tab-pane fade show profile-overview" id="profile-overview">

        <h5 className="card-title">Confirm profile edit</h5>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Email</div>
          <div className="col-lg-9 col-md-8">{profile.email}</div>
        </div>  

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Name</div>
          <div className="col-lg-9 col-md-8">{profile.name}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Lastname</div>
          <div className="col-lg-9 col-md-8">{profile.lastname}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Sex</div>
          <div className="col-lg-9 col-md-8">{profile.sex}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">phone</div>
          <div className="col-lg-9 col-md-8">{profile.phone}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Day of Birth</div>
          <div className="col-lg-9 col-md-8">{profile.dob}</div>
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