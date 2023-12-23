import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Popular from "./Components/Popular";
import TopRated from "./Components/TopRated";
import Upcoming from "./Components/Upcoming";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import SingleMovie from "./Components/SingleMovie";
function App() {
  
  return (
    <BrowserRouter>

      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
            <Route exact  path="/popular" element={<Popular />} />
            <Route  exact path="/top_rated" element={<TopRated />} />
            <Route exact path="/upcoming" element={<Upcoming />} />
            <Route exact path="/singleMovie/:movieId" element={<SingleMovie/>} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
