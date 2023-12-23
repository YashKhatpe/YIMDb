import React,{useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
const SingleMovie = () => {
  const location = useLocation();
  const userData = location.state;
  console.log("Received user data: ", userData);
  const { id } = useParams();
  const { title, name, backdrop_path, poster_path, release_date, first_air_date, overview} = userData;
  
  const getYear = ()=> {
    let year;
    if (release_date) {
      const date = new Date(release_date);
      year = date.getFullYear();
      console.log(year);
      
    }else {
      const date = new Date(first_air_date);
      year = date.getFullYear();
      console.log(year);
    }
    return year;
    
  }
    // const [selectedMovie, setSelectedMovie] = useState(null);
    // useEffect(() => {
    //     // const storedMovie = localStorage.getItem('selectedMovie');
    //     // if (storedMovie) {
    //       // setSelectedMovie(JSON.parse(storedMovie));
    //       // console.log(storedMovie);
    // // console.log("Backrop path: ",backdrop_path);
    // // }
    // }, [props]);

    
  return (
    <>
    {userData && (
    <div className='myimg1 singleImgSec' style={{backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`, height: '87.66669999999999vh', backgroundSize: 'cover' }}>
        <div className="box" style={{
          overflow: 'hidden',
          display: 'flex'}}>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} style={{backgroundSize: '100% 100%',
    borderRadius: '10px',
    boxShadow: '10px 10px 10px -5px rgba(0, 0, 0, 0.5)'}
    } alt="Img" />
      {/* <h2>{userData.title?userData.title:userData.name}</h2> */}
        </div>
      <div className="info"
      style={{
        position: 'relative',
        top: '110px',
        left: '376px',
        color: 'white',
        width: '860px'
      }}>
        <p>
        <h2>{title}</h2>
        </p>
        <p>
          <h3>
            ({release_date.slice(0,4)})
            </h3>
            </p>
            <p>
              {overview}
            </p>
      </div>
    </div>
    )}
    </>
  );
}

export default SingleMovie;
