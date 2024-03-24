import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { storeAuth } from '../features/loginDetails/loginAuth';
import { useSelector, useDispatch } from 'react-redux'
const Navbar = () => {
  const authChecker = useSelector((state) => state.loginCreds.value)
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  
  const LogoutFun = () => {
    dispatch(storeAuth(''))
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user-id");
    // eslint-disable-next-line
    document.cookie = "authtoken" + "=; expires=Thu, 01-Jan-01 00:00:01 GMT;";
    navigate("/");
    setLocalToken(null)
  };
  useEffect(() => {
    console.log('Logout AuthChecker: ',authChecker);
  }, [authChecker]);
  
  
  const [localToken, setLocalToken] = useState(() => {
    //                      <-----------------------IMP NOTE----------------------->
    // We used local Storage to check user credentials but now we created  redux to store to the atuh tokem in a state so we will not use local Storage now.
    // const localTokenVar = localStorage.getItem('token');
    // return localTokenVar || null;
  });
  // useEffect(() => {
  //   var localTokenVar = localStorage.getItem('token');
  //   setLocalToken(localTokenVar || null);
    
  //   // Check if the token is present and navigate accordingly
  //   if (localTokenVar) {
  //     navigate(location.pathname);
  //     console.log(location.pathname);
  //   }
  // }, []);



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
          {!authChecker ? (
            <>
          <Link
            to="/loginPage"
            className="m3"
            style={{ position: "absolute", right: "160px" }}
          >
            {" "}
            <button className="btn btn-danger">Login</button>
          </Link>
          <Link
            to="/signupPage"
            className="mx-3"
            style={{ position: "absolute", right: "58px" }}
          >
            <button className="btn btn-danger">Signup</button>
          </Link>
          </>
          ):
          (
            <>
          <Link to='/myacc'>
            <div className="userLogo" >Y</div>
          </Link>
          
          
          <button
            className="btn btn-danger"
            onClick={LogoutFun}
            style={{
              position: "absolute",
              right: "80px",
            }}
            >
            Logout
          </button>
          </>)}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            // data-bs-target="#navbarSupportedContent"
            data-bs-target="#navbarToggleExternalContent"
            // aria-controls="navbarSupportedContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" 
          // id ="navbarNav"
          id="navbarToggleExternalContent"
          >
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
