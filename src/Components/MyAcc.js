// Inside MyAcc.js
import React from 'react';
import { useAuth } from './Context/AuthContext';
import { Navigate } from 'react-router-dom';

const MyAcc = () => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login page if user is not logged in
        return <Navigate to="/loginPage" />;
    }

    // Your MyAcc component logic for a logged-in user
    return (
        <div>
            <h1>Welcome to My Account</h1>
            {/* Render the rest of your MyAcc component */}
        </div>
    );
};

export default MyAcc;
