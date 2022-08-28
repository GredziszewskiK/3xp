import React, { useContext, useState } from "react";
import { Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import { RainbowSpinner,} from "react-spinners-kit";


import { UserContext, ProfileContext } from "../services/context";
import ProfileOverview from "./profile.overview";
import ProfileEdit from "./profile.edit";
import ProfilePassword from "./profile.password";
import ProfileCofirm from "./profile.confirm";

function Profile() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState();
  let navigate = useNavigate();
  let url = useLocation();

  React.useEffect(() => {
    if (url.pathname === '/profile' || url.pathname === '/profile/') {
      navigate("/profile/overview");
    }
  }, [url, navigate]);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
            <h1>Profile</h1>
        </div>
        {user ?
        <section className="section profile">
          <div className="row">

            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img src="/cm_icon.png" alt="Profile" />
                  <h2>{user.name} {user.lastname}</h2>
                  <h3>Your age: {user.age}</h3>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body">
                  <ul className="nav nav-tabs nav-tabs-bordered">

                    <li className="nav-item">
                      <Link className="nav-link" to={"/profile/overview"}>Overview</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to={"/profile/edit"}>Edit Profile</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to={"/profile/password"}>Change Password</Link>
                    </li>

                  </ul>
                    <ProfileContext.Provider value={{profile, setProfile}}> 
                      <Routes>
                          <Route path="/overview" element={<ProfileOverview/>}/>
                          <Route path="/edit" element={<ProfileEdit/>}/>
                          <Route path="/password" element={<ProfilePassword/>}/>
                          <Route path="/edit/confirm" element={<ProfileCofirm />} />
                      </Routes>
                    </ProfileContext.Provider>
                </div>

              </div>
            </div>

          </div>
        </section>
        :
        <div className="spinner">  
          <RainbowSpinner size={50} color="purple"  loading={true} />
        </div>
        }
      </main>
    </div>
  );
};

export default Profile