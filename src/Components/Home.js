import React, {useEffect, useState} from "react";
import Movies from "./Movies";
import '../App.css'
import Spinner from "./Spinner";
// import { Link } from "react-router-dom";
const API_KEY = 'f9c8168ed027bcef24dd5c46a213e522';
const Home = () => {
  let i = 0;
  const [results, setResults] = useState([]);
  // const [page, setPage] = useState(1);
  let allResults = []
  const [loading, setLoading] = useState(false);
  console.log("HEllo");
  
  const getMovies = async ()=> {
    let totalPage = 2;
    let page =1;
    
    try {
      setLoading(true);
      while (page <= totalPage) {
        const allTrendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`;

        const data = await fetch(allTrendingUrl);
        const parsedData = await data.json();

        if (parsedData.results && Array.isArray(parsedData.results)) {
          allResults = [...allResults, ...parsedData.results];
        } else {
          console.error("Invalid or missing 'results' property in API response:", parsedData);
        }

        page++;
      }
      setLoading(false);
      // Update the state once with all fetched data
      setResults(allResults);
    } catch (error) {
      console.log("Error in fetching all trending movies: ", error);
    }
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, []); // Empty dependency array to mimic componentDidMount

  useEffect(() => {
    console.log(results);
    // Add any additional side effects related to 'results' here
  }, [results]);
  return (
    <>
    <section className="myimg" >
        <div className="container mycont">
    <form className="d-flex myform"  role="search">
        <input className="form-control me-2" type="search" style={{borderRadius: '30px'}} placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" style={{backgroundColor: `#19cfb5`, position: 'absolute', right: '0', borderRadius: '30px' }} type="submit">Search</button>
      </form>
        </div>
    </section>
    <div className="mt-5 my-2" style={{paddingLeft: '50px'}} >
        <h2>
            All Trending Movies & TV Shows - Today
        </h2>
    </div>
    {loading && <Spinner />}
    <div className="movie-container ">
      {!loading && results.map((element, index)=> {
        return(
          <Movies key={index} 
          adult= {element.adult}
          backdrop_path = {element.backdrop_path}
          id = {element.id}
          media_type = {element.media_type}
          original_language = {element.original_language}
          original_title = {element.original_title}
          overview = {element.overview}
          popularity = {element.popularity}
          poster_path = {element.poster_path}
          release_date = {element.release_date}
          title = {element.title}
          video = {element.video}
          vote_average = {element.vote_average}
          vote_count = {element.vote_count}
          name = {element.name}
          first_air_date = {element.first_air_date}
          />
        )
      })}
    </div>
    <div className="mt-5 my-2" style={{paddingLeft: '50px'}} >
        <h2>
            <br/>
            All Trending Movies & TV Shows - This Week
        </h2>
    </div>
    <div className="movie-container">
        {/* <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/> */}
    </div>
    <div className="mt-5 my-2" style={{paddingLeft: '50px'}} >
        <h2>
            <br/>
            Trending Movies - Today
        </h2>
    </div>
    <div className="movie-container">
        {/* <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/> */}
    </div>
    <div className="mt-5 my-2" style={{paddingLeft: '50px'}} >
        <h2>
            <br/>
            Trending Movies - This Week
        </h2>
    </div>
    <div className="movie-container">
        {/* <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/> */}
    </div>
    <div className="mt-5 my-2" style={{paddingLeft: '50px'}} >
        <h2>
            <br/>
            Trending TV Shows - Today
        </h2>
    </div>
    <div className="movie-container">
        {/* <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/> */}
    </div>
    <div className="mt-5 my-2" style={{paddingLeft: '50px'}} >
        <h2>
            <br/>
            Trending TV Shows - This Week
        </h2>
    </div>
    <div className="movie-container">
        {/* <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/> */}
    </div>
    
    </>
  );
};

export default Home;
