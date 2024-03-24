const express = require("express");
const router = express.Router();
const UserDetails = require("../models/UserDetails");
const User = require("../models/User"); // Assuming you have a User model



// Validation middleware for the 'favourites' route
const validateFavourites = async (req, res, next) => {
  const {
    userId,
    userName,
    movieId,
    title,
    release_date,
    description,
    poster_path,
  } = req.body;

  // Check if userId exists in the User collection
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(400).json({ error: "Invalid userId." });
  }

  // Check if the movieId already exists in 'favourites'
  const existingFavourite = await UserDetails.findOne({
    userId,
    "favourites.movieId": movieId,
  });
  if (existingFavourite) {
    return res
      .status(400)
      .json({ error: "Movie already added to favourites." });
  }

  // If validation passes, store favourites data in req.userData
  req.userData = {
    userId,
    userName,
    favourites: [{ movieId, title, release_date, description, poster_path }],
  };



  next();
};

// Route for 'favourites'
router.post("/favourites", validateFavourites, async (req, res) => {
  try {
    // Store data in the UserDetails collection
    await UserDetails.updateOne(
      { userId: req.userData.userId },
      {
        $set: { userName: req.userData.userName },
        $addToSet: { favourites: req.userData.favourites },
      },
      { upsert: true }
    );

    res
      .status(201)
      .json({ success: true, message: "Favourites data stored successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Validation middleware for the 'ratings' route
// const validateRatings = async (req, res, next) => {
//   const {
//     userId,
//     userName,
//     movieId,
//     title,
//     release_date,
//     description,
//     poster_path,
//     rating,
//   } = req.body;

//   // Check if userId exists in the User collection
//   const userExists = await User.exists({ _id: userId });
//   if (!userExists) {
//     return res.status(400).json({ error: "Invalid userId." });
//   }

//   // If a rating for the movieId already exists, update the existing rating
//   const existingRating = await UserDetails.findOneAndUpdate(
//     { userId, "ratings.movieId": movieId },
//     { $set: { "ratings.$.rating": rating } },
//     { new: true }
//   );
//   console.log('Existing rating:', existingRating);

//   if (!existingRating) {
//     // If no existing rating, append new rating data to req.userData
//     req.userData = {
//       userId,
//       ratings: [
//         {
//           userName,
//           movieId,
//           title,
//           release_date,
//           description,
//           poster_path,
//           rating,
//         },
//       ],
//     };
//   }

//   next();
// };
// Route for 'ratings'
// router.post("/ratings", validateRatings, async (req, res) => {
//   try {
//     // console.log(req.userData);
//     if (req.userData.ratings) {
//       // If new rating data is present, store/update data in the UserDetails collection for the specified userId
//       await UserDetails.updateOne(
//         { userId: req.userData.userId },
//         { $set: { "ratings.$.rating": req.userData.ratings[0].rating } },
//         { upsert: true } // This will create the document if it doesn't exist
//       );
//     }

//     res
//       .status(201)
//       .json({ success: true, message: "Ratings data stored successfully." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });







const validateRatings = async (req, res, next) => {
  const {
    userId,
    userName,
    movieId,
    title,
    release_date,
    description,
    poster_path,
    rating,
  } = req.body;

  // Check if userId exists in the User collection
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(400).json({ error: "Invalid userId." });
  }

  // Set req.userData with the new rating data
  req.userData = {
    userId,
    userName,
    ratings: [
      {
        movieId,
        title,
        release_date,
        description,
        poster_path,
        rating,
      },
    ],
  };

  next();
};

// Route for 'ratings'
router.post("/ratings", validateRatings, async (req, res) => {
  try {
    // Get existing user details
    const existingUserDetails = await UserDetails.findOne({ userId: req.userData.userId });

    if (existingUserDetails) {
      // If user details exist, update the ratings array
      existingUserDetails.ratings.push(...req.userData.ratings);
      await existingUserDetails.save();
    } else {
      // If no existing user details, create a new document
      await UserDetails.create(req.userData);
    }

    res.status(201).json({ success: true, message: "Ratings data stored successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});











// Validation middleware for the 'addedToList' route
const validateAddedToList = async (req, res, next) => {
  // console.log('Received request body:', req.body);
const {
  userId,
  userName,
  movieId,
  title,
  release_date,
  description,
  poster_path,
} = req.body;

// Check if userId exists in the User collection
const userExists = await User.exists({ _id: userId });
if (!userExists) {
  return res.status(400).json({ error: "Invalid userId." });
}

// Check if the movieId already exists in 'addedToList'
const existingAddedToList = await UserDetails.findOne({
  userId,
  "addedToList.movieId": movieId,
});
if (existingAddedToList) {
  return res
    .status(400)
    .json({ error: "Movie already added to addedToList." });
}

// If validation passes, store addedToList data in req.userData
req.userData = {
  userId,
  userName,
  addedToList: [{ 
      movieId: movieId, 
      title: title, 
      release_date: release_date,  
      description: description, 
      poster_path: poster_path 
  }],
};
//   console.log(req.userData.addedToList);
next();
};
// Route for 'addedToList'
router.post("/addedToList", validateAddedToList, async (req, res) => {
  try {
    // Store data in the UserDetails collection
    const updatedData = await UserDetails.updateOne(
      { userId: req.userData.userId },
      { $push: { addedToList: req.userData.addedToList } },
      { upsert: true } // This will create the document if it doesn't exist
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Added to list data stored successfully.",
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
