// db.js
require('dotenv').config()

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log(uri);
mongoose.connect(uri);
 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose;