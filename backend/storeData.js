const fetchMovies = require('./fetchData');
const Movie = require('./movieModel');

  const storeData = async (endpoint)=> {
  try {
    const movies = await fetchMovies(endpoint);

    // Clear existing data in the collection (optional)
    await Movie.deleteMany({ endpoint });

    // Insert new data into the collection
    await Movie.insertMany(movies.map(movie => ({ ...movie, endpoint })));

    console.log(`Data stored for ${endpoint} in MongoDB successfully`);
  } catch (error) {
    console.error(`Error storing data for ${endpoint}:`, error.message);
  }
}

// Fetch and store data for each endpoint
storeData('top_rated');
storeData('popular');
storeData('upcoming');
