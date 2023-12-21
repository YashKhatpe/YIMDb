// fetchData.js
const axios = require('axios');

const TMDB_API_KEY = 'f9c8168ed027bcef24dd5c46a213e522';
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

  const fetchMovies = async (endpoint, totalPages=1)=> {
  const endpointUrls = {
    top_rated: '/movie/top_rated',
    popular: '/movie/popular',
    upcoming: '/movie/upcoming',
  };
  const results = [];

  for (let page = 1; page <= totalPages; page++) {
    
      const url = `${TMDB_API_BASE_URL}${endpointUrls[endpoint]}`;
      try {
        const response = await axios.get(url, {
          params: {
            api_key: TMDB_API_KEY,
            page: page,
          },
        });
    
        results.push(...response.data.results);
      } catch (error) {
        console.error(`Error fetching data from ${endpoint} endpoint:`, error.message);
        throw error;
      }
  }

  return results;

};

module.exports = fetchMovies;
