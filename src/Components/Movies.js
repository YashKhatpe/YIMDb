import React from "react";
import { useNavigate } from "react-router-dom";

const Movies = ({
  adult,
  id,
  media_type,
  original_language,
  original_title,
  overview,
  popularity,
  video,
  title,
  name,
  release_date,
  backdrop_path,
  first_air_date,
  poster_path,
  vote_average,
  vote_count,
}) => {

  const naviagate = useNavigate();

  const handleClick = () => {
    naviagate(`/singleMovie/${id}`, {
      state: {
        title: title,
        name: name,
        overview: overview,
        poster_path: poster_path,
        backdrop_path: backdrop_path,
        id: id,
        release_date: release_date,
        first_air_date: first_air_date,
        popularity: popularity,
        vote_average: vote_average,
        vote_count: vote_count,
      },
    });
  };



  return (
    <>
      <div className="col-md-3 mx-4" style={{ width: "150px" }}>
        <div className="card mx-2 cardWidth" style={{ height: "250px" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            className="card-img-top"
            onClick={handleClick}
            alt="..."
            style={{
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
            {title ? title : name}
          </h5>
          <p className="card-text mx-1">
            {release_date
              ? release_date
              : release_date
              ? first_air_date
              : first_air_date
              ? first_air_date
              : "3030-30-30"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movies;
