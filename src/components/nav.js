import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../services/context';
import { Person, BoxArrowRight, Gear, List, Journal } from "react-bootstrap-icons";



function Nav() {
  const  { user } = useContext(UserContext)
  const toggleNav = () => {
    const body = document.querySelector("body");
    body.classList.toggle('toggle-sidebar');
    
  }

  return (

    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to={"/"} className="logo d-flex align-items-center">
            <img src="/cookie.png" alt=""/>
            <span className="d-none d-lg-block">3xP</span>
          </Link>
          <i className={"toggle-sidebar-btn"}><List onClick={toggleNav} /> </i>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">

            <li className="nav-item dropdown pe-3">

              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="/cm_icon.png" alt="Profile" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{user.name}</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user.name}</h6>
                </li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li>
                  <Link to={"/profile/overview"} className="dropdown-item d-flex align-items-center">
                    <Person />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li>
                  <Link to={"/profile/edit"} className="dropdown-item d-flex align-items-center">
                    <Gear />
                    <span>Edit Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li>
                  <Link to={"/logout"} className="dropdown-item d-flex align-items-center">
                    <BoxArrowRight/>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        
      </header>

      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to={"/profile/overview"} className="nav-link collapsed">
              <Person />
              <span>Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/projects"} className="nav-link collapsed">
              <Journal />
              <span>Projects</span>
            </Link>
          </li>
        </ul>
      </aside>
    </div> 

  );
}

export default Nav