// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    try {
        
        const [user, setUser] = useState(null);
        
        const login = async(userData) => {
            // Perform login logic, set the user data
            console.log(userData);
            setUser(userData);
            console.log('Setting User:', user);
        };

  const logout = async() => {
      // Perform logout logic, clear the user data
    setUser(null);
    console.log('Logging out:',user);
  };
  
  return (
      <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} catch (error) {
    console.log("Error: ", error);
}
};

export const useAuth = () => useContext(AuthContext);
