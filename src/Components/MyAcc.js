// Inside MyAcc.js
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./Component.css";
// import MySvgImage from './myAccSvg.svg';

const MyAcc = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      const tokenCookie = Cookies.get("authtoken");

      if (!(tokenCookie || token)) {
        return <Navigate to="/loginPage" />;
      }
    };

    checkLoginStatus();
    fetchUserDetails();
  }, []);

  // if (!isLoggedIn) {
  // Redirect to login page if the user is not logged in
  // return <Navigate to="/loginPage" />;
  // }

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/auth/getuser", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    console.log(response.data);
    const { name, email, date } = await response.data;
    const properDate = new Date(date);
    setUser({ name, email, properDate });
    //   console.log(name);
    //   console.log(email);
    //   console.log(date);
    console.log(properDate);
  };

  // Your MyAcc component logic for a logged-in user
  return (
    user && (
      <div className="maindiv">
        <div className="circle-cont">
          <span className="circle">{user.name.toString()[0]}</span>
        </div>
        <div className="userDetails">
        <h2>{user.name.toString()}</h2>
        <h5>Member since {user.properDate.toString().slice(4, 15)}</h5>
        </div>
        <div className="my-3 userScore">
          <h3 className="mx-2">0 Ratings</h3>
          <h3>0 Reviews</h3>
        </div>
      </div>
    )
  );
};

export default MyAcc;
