// movieModel.js
const mongoose = require("./db");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: String,
  overview: String,
  release_date: Date,
  popularity: Number,
  releaseDate: Date,
  originalLanguage: String,
  posterPath: String,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie, movieSchema };
