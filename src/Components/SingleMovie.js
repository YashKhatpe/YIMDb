import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultImg from "./no_img.png";
const fetchMovieDetails = require("../FetchingFunctions/MovieDetails");
const SingleMovie = () => {
  const API_KEY = "f9c8168ed027bcef24dd5c46a213e522";
  const location = useLocation();
  const userData = location.state;
  console.log("Received user data: ", userData);

  const {
    id,
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
  const handleParaColor = ()=>{

    if (pColorTag === 'white') {
      setPColorTag('black');
    } else {
      setPColorTag('white')
    }
  }

  const fetchTrailer = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
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
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
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
        `https://api.themoviedb.org/3/movie/${id}?api_key=f9c8168ed027bcef24dd5c46a213e522`
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchDetails();
      await fetchTrailer();
      await fetchCast();
      setIsDataLoaded(true);
    };
    fetchData();
  }, [id]);

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
            height: "87.66669999999999vh",
            backgroundSize: "cover",
          }}
        >
          <div
            className="form-check form-switch"
            style={{
              position: "relative",
              width: "222px",
              left: "1030px",
              top: "22px",
            }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={handleParaColor}
              
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{color: pColorTag}}>
              Switch mode for visibility
            </label>
          </div>
          <div
            className="box"
            style={{
              overflow: "hidden",
              display: "flex",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              style={{
                backgroundSize: "100% 100%",
                borderRadius: "10px",
                boxShadow: "10px 10px 10px -5px rgba(0, 0, 0, 0.5)",
              }}
              alt="Img"
            />
          </div>
          <div
            className="info"
            style={{
              position: "relative",
              top: "110px",
              left: "376px",
              color: "white",
              width: "860px",
            }}
          >
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
            <button
              className="btn btn-success mb-4"
              onClick={handleClickTrailer}
            >
              <i className="fa-solid fa-play mx-2"></i>View Trailer
            </button>
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
            {/* { !movieDetailstate.length == 0 ? (
            ) : (
              'p'
            )} */}

            <p style={{color: pColorTag}}>Overall Ratings by Users: {vote_average}</p>
          </div>
        </div>
      )}

      {isDataLoaded && !key.length == 0 && (
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
                      className="card mx-2 cardWidth"
                      style={{ width: "250px", height: "250px" }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${element.key}/0.jpg`}
                        className="card-img-top"
                        alt="..."
                        onClick={() => handleExtraTrailerClick(element.key)}
                        style={{
                          width: "250px",
                          height: "100%",
                          backgroundSize: "100% 100%",
                          borderRadius: "7px",
                          boxShadow: "10px 10px 10px -5px rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </div>
                    <div className=" card-body mx-2 my-2">
                      <h5
                        className="card-title mx-1"
                        style={{
                          fontSize: "16px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
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
      {!castResults.length == 0 && (
        <>
          <div className="text-center my-5">
            <h2>Top Cast: {title}</h2>
          </div>
          <div className="container movie-container">
            {castResults.map((element, index) => (
              <div key={index}>
                <div className="col-md-3 mx-5" style={{ width: "250px" }}>
                  {element.name && (
                    <div
                      className="card mx-2 cardWidth"
                      style={{ width: "250px", height: "250px" }}
                    >
                      <img
                        src={element.profile_path?`https://image.tmdb.org/t/p/w500${element.profile_path}`: defaultImg}
                        className="card-img-top"
                        alt="..."
                        style={{
                          width: "250px",
                          height: "100%",
                          backgroundSize: "100% 100%",
                          borderRadius: "7px",
                          boxShadow: "10px 10px 10px -5px rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </div>
                  )}
                  <div className=" card-body mx-2 my-2">
                    <h5
                      className="card-title mx-1"
                      style={{
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
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
