const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDetailsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userName: {
        type: String,
        required: true
    },

    addedToList:[{
        movieId: Number,
        title: String,
        release_date: Date,
        description: String,
        poster_path: String,
    }],

    favourites:[{
        movieId: Number,
        title: String,
        release_date: Date,
        description: String,
        poster_path: String,
    }],

    ratings:[{
        movieId: Number,
        title: String,
        release_date: Date,
        description: String,
        poster_path: String,
        rating: Number,
    }],

    
    date:{
        type: Date,
        default: Date.now
    },
  });
  const UserDetails = mongoose.model('userDetails', UserDetailsSchema);
  module.exports = UserDetails;