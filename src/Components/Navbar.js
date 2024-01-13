import React from "react";
// import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from './Context/AuthContext';
import "../App.css";
const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  

  return (
    <>
      <nav className="navbar navbar-dark ">
        <div className="container-fluid">
          <Link
            className="navbar-brand nav-heading"
            to="/"
            style={{ position: "relative", left: "552px" }}
          >
            <h2 className="navHover">YIMDb</h2>
          </Link>
          <Link to='/loginPage' className="m3" style={{position: 'absolute', right: '160px'}}> <button className="btn btn-danger">Login</button></Link>
          <Link to='/signupPage' className="mx-3" style={{position: 'absolute', right: '58px'}}><button className="btn btn-danger" >Signup</button>
          </Link>
          <button className="btn btn-danger"onClick={logout}>Logout</button>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/popular" ? "active" : ""
                  }`}
                  to="/popular"
                >
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/top_rated" ? "active" : ""
                  }`}
                  to="/top_rated"
                >
                  Top Rated
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/upcoming" ? "active" : ""
                  }`}
                  to="/upcoming"
                >
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
