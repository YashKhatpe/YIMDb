// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';

// const PrivateRoute = ({ component: Component, checkAuth = true }) => {
//   const { user } = useAuth();

// //   if (!checkAuth) {
// //     // If checkAuth is set to false, render the component without authentication check
// //     return <Route {...rest} render={(props) => <Component {...props} />} />;
// //   }

//   return (
    
//     // <Route
//     //   {...rest}
//     //   render={(props) =>
//     //     user ? <Component {...props} /> : <Navigate to="/loginPage" />
//     //   }
//     // />
//   );
// };

// export default PrivateRoute;
