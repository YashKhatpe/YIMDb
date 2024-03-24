import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import defaultImg from "./no_img.png";
import secrets from "./secret";
import "./Component.css";
const bootstrap = require('bootstrap')
const API_KEY = secrets.apiKey;
const fetchMovieDetails = require("../FetchingFunctions/MovieDetails");
const SingleMovie = () => {
  // Tootltip Initialization
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //eslint-disable-next-line
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  const location = useLocation();
  const userData = location.state;
  const { movieId } = useParams();
  console.log(movieId);
  console.log("Received user data: ", userData);

  const {
    title,
    name,
    backdrop_path,
    poster_path,
    release_date,
    first_air_date,
    overview,
    vote_average,
  } = userData;

  const [results, setResults] = useState([]); // Contains details of every trailer video of the movie
  const [castResults, setCastResults] = useState([]); // Contains details of all the cast in the movie
  const [key, setKey] = useState([]); // Contains keys of every trailer's YouTube video
  const [isDataLoaded, setIsDataLoaded] = useState(false); // TO check whether the data is loaded or not
  const [movieDetailstate, setMovieDetailstate] = useState({}); 
  const [pColorTag, setPColorTag] = useState('white');


  const fetchTrailer = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
      const data = await fetch(url);
      const parsedData = await data.json();

      if (parsedData.results && Array.isArray(parsedData.results)) {
        await setResults(parsedData.results);
        console.log("Parsed Trailer Data: ", parsedData.results);
      } else {
        console.error(
          "Invalid or missing 'results' property in Trailer API response:",
          parsedData
        );
      }
    } catch (error) {
      console.log("Error fetching trailer from API: ", error);
    }
  };

  const fetchCast = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
      const data = await fetch(url);
      const parsedData = await data.json();

      if (parsedData.cast && Array.isArray(parsedData.cast)) {
        await setCastResults(parsedData.cast);
        console.log("Parsed Cast Data: ", parsedData.cast);
      } else {
        console.error(
          "Invalid or missing 'results' property in Cast API response:",
          parsedData
        );
      }
    } catch (error) {
      console.log("Error fetching trailer from API: ", error);
    }
  };

  // let movieDetailsObj = {};

  const fetchDetails = async () => {
    try {
      const movieDetails = await fetchMovieDetails(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      console.log("Title: ", movieDetails.title);
      setMovieDetailstate(movieDetails);
      console.log("Movie Details Data", movieDetailstate);
      console.log("Movie Budget", movieDetailstate.budget);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setIsDataLoaded(true); // Set isDataLoaded to true even in case of an error
    }
  };

  const handleClickTrailer = async () => {
    const trailerUrl = `https://www.youtube.com/watch?v=${key[0]}`;
    console.log("Tariler URL: ", trailerUrl);
    window.open(trailerUrl, "New Window");
  };

  const handleExtraTrailerClick = async (urlKey) => {
    const trailerUrl = `https://www.youtube.com/watch?v=${urlKey}`;
    console.log("Tariler URL: ", trailerUrl);
    window.open(trailerUrl, "New Window");
  };

  const hanleWatchList = () => {
    alert("Added To Watch List");
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchDetails();
      await fetchTrailer();
      await fetchCast();
      setIsDataLoaded(true);
    };
    fetchData();
    // eslint-disable-next-line
  }, [movieId]);

  //  fetchDetails();

  useEffect(() => {
    // Use another useEffect to handle the side effect of updating key when results changes
    const keys = results.map((element) => element.key);
    setKey(keys);
    console.log("All Keys: ", keys);
  }, [results]);

  return (
    <>
      {userData && (
        <div
          className="myimg1 singleImgSec"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`,
            height: "460px",
            backgroundSize: "cover",
          }}
        >
          <div className="overlay" >
          
          <div
            className="box">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt="Img"
            />
          </div>
          <div className="info">
            <h2 style={{ marginBottom: "-13px" }}>
              <p style={{color: pColorTag}}>{title ? title : name}</p>
            </h2>
            <h6>
              <p style={{ marginBottom: "8px", color: pColorTag }}>
                (
                {release_date
                  ? release_date.slice(0, 4)
                  : first_air_date.slice(0, 4)}
                )
              </p>

              <p style={{color: pColorTag}}>
                {movieDetailstate.runtime
                  ? `${Math.floor(Number(movieDetailstate.runtime) / 60)} h ${
                      Number(movieDetailstate.runtime) % 60
                    } m`
                  : "Duration: Average"}
              </p>
            </h6>
            <div>
            <a
              // className="btn btn-success mb-4"
              style={{position: "relative", bottom: '5px', cursor: 'pointer'}}
              onClick={handleClickTrailer}
              >
              <i className="fa-solid fa-play mx-2"/>View Trailer
            </a>
            <button className="mx-3 round-button" 
            data-bs-toggle="tooltip" 
            data-bs-placement="bottom" 
            data-bs-title="Add to WatchList"
            aria-label="Button with tooltip on top"
            onClick={hanleWatchList}
            >
                <i className="fa-solid fa-list"/>
            </button>
            <button className="mx-3 round-button"
            data-bs-toggle="tooltip" 
            data-bs-placement="bottom" 
            data-bs-title="Mark as favourite" 
            aria-label="Button with tooltip on top"
            onClick={hanleWatchList}
            >
            <i className="fa-solid fa-heart"></i>
            </button>
            <button className="mx-3 round-button"
            data-bs-toggle="tooltip" 
            data-bs-placement="bottom" 
            data-bs-title="Rate it"
            aria-label="Button with tooltip on top"
            onClick={hanleWatchList}
            >
                <i className="fa-solid fa-star"/>
            </button>
            </div>
            <p style={{color: pColorTag}}>
              Overview: <br />
              {overview}
            </p>
            <p style={{color: pColorTag}}>
              Budget:{" "}
              {movieDetailstate.budget
                ? movieDetailstate.budget
                : "Not disclosed"}
            </p>

            <p style={{color: pColorTag}}>Overall Ratings by Users: {vote_average}</p>
          </div>
          </div>
        </div>
      )}
      {
      // eslint-disable-next-line
      isDataLoaded && !key.length == 0 && (
        <>
          <div className="text-center my-5">
            <h2>More Videos About {title}</h2>
          </div>
          <div className="container movie-container">
            {results &&
              results.map((element, index) => (
                <div key={index}>
                  <div className="col-md-3 mx-5" style={{ width: "250px" }}>
                    <div
                      className="card mx-2 cardWidth moreVideos"
                      style={{ width: "250px", height: "250px" }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${element.key}/0.jpg`}
                        className="card-img-top"
                        alt="..."
                        onClick={() => handleExtraTrailerClick(element.key)}/>
                    </div>
                    <div className=" card-body mx-2 my-2">
                      <h5
                        className="card-title mx-1 movieTitel moreVideoCard">
                        {element.title ? element.title : element.name}
                      </h5>
                      <p className="card-text mx-1">
                        {element.type ? element.type : "Video"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {
      // eslint-disable-next-line
      !castResults.length == 0 && (
        <>
          <div className="text-center my-5">
            <h2>Top Cast: {title}</h2>
          </div>
          <div className="container movie-container">
            {castResults.map((element, index) => (
              <div key={index}>
                <div className="col-md-3 mx-5" style={{ width: "250px" }}>
                  {element.name && (
                    <div className="card mx-2 cardWidth topCast">
                      <img
                        src={element.profile_path?`https://image.tmdb.org/t/p/w500${element.profile_path}`: defaultImg}
                        className="card-img-top"
                        alt="..."/>
                    </div>
                  )}
                  <div className=" card-body mx-2 my-2">
                    <h5
                      className="card-title mx-1 topCastCard">
                      {element.title ? element.title : element.name}{" "}
                      {element.character ? `as ${element.character}` : ""}
                    </h5>
                    <p className="card-text mx-1">
                      {element.known_for_department
                        ? element.known_for_department
                        : "Video"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SingleMovie;
