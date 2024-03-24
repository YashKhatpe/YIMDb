// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  try {
    const login = async (userData) => {
      try {
        // Perform login logic, set the user data
        console.log(userData);
        localStorage.setItem("username", userData);
        setUser(userData);
        console.log("Setting User:", userData);
        console.log('User:', user);
      } catch (error) {
        console.error("Login Error: ", error);
      }
    };

    // const logout = async () => {
    //   try {
    //     // Perform logout logic, clear the user data
    //     setUser(null);
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("username");
    //     navigate('/');
    //     console.log("Logging out:", user);
    //   } catch (error) {
    //     console.error("Logout Error: ", error);
    //   }
    // };

    useEffect(() => {
      // This effect will log the updated user state whenever it changes
      console.log("User state updated:", user);
    }, [user]);

    return (
      <AuthContext.Provider value={{ user, login }}>
        {children}
      </AuthContext.Provider>
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const useAuth = () => useContext(AuthContext);
