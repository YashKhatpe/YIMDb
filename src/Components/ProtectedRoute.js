import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Routes>

    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Navigate to="/login" />)}
      />  
      </Routes>
  );
};


export default ProtectedRoute;