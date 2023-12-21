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