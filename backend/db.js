// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/"
// const connectToMongo = () => {
//     mongoose.connect(mongoURI);
//     console.log("Connected to Mongo Successfully");
// }
// module.exports = connectToMongo;

// const mongoose = require("mongoose");
// const axios = require("axios");

// const uri = "mongodb://127.0.0.1:27017/YIMDb";
// const apiKey = "f9c8168ed027bcef24dd5c46a213e522";
// const baseUrl = "https://api.themoviedb.org/3";
// const collectionName = "popular";

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(uri);

//     console.log("Connected to MongoDB successfully");
//     let data;
//     // Example endpoint: Get popular movies
//     const endpoint = "/movie/popular";
//     const params = { api_key: apiKey, page: 1 };
//     let allResults = [];
//     // Make the request to TMDb API
//     do {
//       const response = await axios.get(`${baseUrl}${endpoint}`, { params });
//       data = await response.data;
//       // Append the current page's results to the overall results array
//       allResults = allResults.concat(data.results);

//       // Move to the next page
//       params.page++;
//     } while (params.page <= 450); // Continue until all pages are fetched
//      console.log(allResults);
//     // Create a Mongoose model for the 'popular' collection
//     const PopularMovie = mongoose.model("PopularMovies", {
//       title: String,
//       id: {
//         type: Number,
//         unique: true,
//         required: true,
//       },
//       popularity: Number,
//       releaseDate: Date,
//       originalLanguage: String,
//       overview: String,
//       posterPath: String,
//     });

//     // Insert data into the 'popular' collection
//     await PopularMovie.insertMany(data.results);

//     console.log("Data stored successfully");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// connectToMongo();





// db.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://yashkhatpe0611:nNwme4f5kdEqvy3X@cluster0.apvyn2e.mongodb.net/';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose;
