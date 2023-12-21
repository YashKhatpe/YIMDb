const fetchMovies = require('./fetchData');
const mongoose = require('mongoose');
const {movieSchema} = require('./movieModel');

  const storeData = async (collectionName, totalPages)=> {
  try {
    const DynamicMovie = mongoose.model(collectionName, movieSchema);

    const movies = await fetchMovies(collectionName, totalPages);




    //   const Movie = mongoose.model(collectionName, movieSchema);
    //   const movies = await fetchMovies(endpoint, totalPages);
    // Clear existing data in the collection (optional)
    //await Movie.deleteMany({ endpoint });
    // Create a dynamic collection name based on the endpoint
    // const collectionName = `${endpoint}_movies`;

    // Create a new collection if it doesn't exist
    // if (!(await Movie.db.listCollections({ name: collectionName }).hasNext())) {
    //     await Movie.createCollection(collectionName);
    //   }

    // Insert new data into the collection
    await DynamicMovie.insertMany(
      movies.map(movie => ({ ...movie, endpoint: collectionName })), {ordered: false}
    );

    console.log(`Data stored for ${collectionName} in MongoDB successfully`);
  } catch (error) {
    console.error(`Error storing data for ${collectionName}:`, error.message);
  }
}

// Fetch and store data for each endpoint
storeData('top_rated', 451);
storeData('popular', 500);
storeData('upcoming', 28);
