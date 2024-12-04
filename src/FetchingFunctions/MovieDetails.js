
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

// fetchMovieDetails('https://api.themoviedb.org/3/trending/all/day?api_key=api_key');
module.exports = fetchMovieDetails;
