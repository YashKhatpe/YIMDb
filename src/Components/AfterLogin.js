import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AfterLogin = () => {
  const authChecker = useSelector((state) => state.loginCreds.value);

  useEffect(() => {
    console.log('AuthChecker: ', authChecker);
  }, [authChecker]);

  return (
    <>
      {authChecker ? (
        <div>
          <h1>Welcome, you are logged in</h1>
        </div>
      ) : (
        <div>
          <h1>Please Log In</h1>
        </div>
      )}
    </>
  );
};

export default AfterLogin;
