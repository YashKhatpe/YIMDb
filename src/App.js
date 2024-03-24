import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Popular from "./Components/Popular";
import TopRated from "./Components/TopRated";
import Upcoming from "./Components/Upcoming";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Footer from "./Components/Footer";
import SingleMovie from "./Components/SingleMovie";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { AuthProvider } from "./Components/Context/AuthContext";
// import PrivateRoute from "./Components/Route/PrivateRoute";
import { useAuth } from './Components/Context/AuthContext';
import MyAcc from "./Components/MyAcc";
import AfterLogin from "./Components/AfterLogin";
// import PleaseLogin from "./Components/PleaseLogin";
// import ProtectedRoute from "./Components/ProtectedRoute";
import { useEffect } from "react";
function App() {
   let { user } = useAuth();
   useEffect(() => {
     console.log('User: ',user);
   }, [user]);

   let token = localStorage.getItem('token');

   useEffect(() => {
     console.log('Token: ',token);
   }, [token]);
   return (
     
     <BrowserRouter>
     <AuthProvider>

      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
            <Route exact  path="/popular" element={<Popular />} />
            <Route  exact path="/top_rated" element={<TopRated />} />
            <Route exact path="/upcoming" element={<Upcoming />} />
            <Route exact path="/loginPage" element={<Login />} />
            <Route exact path="/myacc" element={token?<MyAcc/>:<Navigate to="/loginPage" />}/>
            <Route exact path="/signupPage" element={<Signup />} />
            <Route exact path="/afterLogin" element={<AfterLogin/>} />
            <Route exact path="/singleMovie/:movieId" element={<SingleMovie/>} />
        </Routes>
      </div>
      <Footer/>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
