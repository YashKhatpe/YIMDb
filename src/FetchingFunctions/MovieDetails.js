
const fetchMovieDetails = async (url)=> {

    try {
        const data = await fetch(url);
        const parsedData = await data.json();
  
        // console.log(parsedData);
        return parsedData;
        
      } catch (error) {
        console.log("Error fetching trailer from API: ", error);
        return null;
      }



};

// fetchMovieDetails('https://api.themoviedb.org/3/trending/all/day?api_key=af9c8168ed027bcef24dd6yh5c46a213e123432325221234');
module.exports = fetchMovieDetails;
