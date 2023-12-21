// movieModel.js
const mongoose = require('./db');

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  release_date: Date,
  // Add more fields as needed
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
