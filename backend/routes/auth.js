const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const JWT_SECRET = "Yashisagoodb$oy";


// Validation middleware
const validateSignup = [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ];

// Signup route
router.post('/signup', validateSignup, async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let success = false;
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(500).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    // Creating a auth token to return to the user so that it can be verified by that token
    const authtoken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.status(200).res.json({success, message: "User Signed Up Successfully", authtoken});
    console.log({ authtoken });

  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({success, message: "Internal Server Error"});
  }
})



// Validation middleware
const validateLogin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ];

// Login route

router.post('/login', validateLogin, async(req,res)=> {

    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Destructuring email and password from the the body of the request
    const {email, password} = req.body;

    try {
        // Finding the user from the db on the basis of the email
        let user = await User.findOne({email})

        if(!user) {
            //If the email is wrong return success as false and error stating invalid credentials
            success = false;
            return res.status(400).json({success, error : "Please enter correct credentials"})
        }
        
        //If the user with that email exists then bcrypt the input pwd and compare with the pwd in the db for that email
        const passwordCompare = await bcrypt.compare(password, user.password);
        
        // If the comparsion returns false again retrun success as false and error stating invalid credentials
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error : "Please enter correct credentials"})
        }

        // If everything is correct create the authtoken and return to the user

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.status(200).json({success, message: "Logged In Successfully", authtoken})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




// Get Users data from the databse and display it
router.get('/getuser', fetchuser,  async (req, res) => {
// The fetchuser midddleware will compare the auth-token which will be obtained through the header in the get request and then this async function will run if it returns true
  try {
    let userId = req.user.id;
    // The details of the user excluding the password will be displayed to the user from the db
    const user = await User.findById(userId).select("-password")
    
    res.send(user);
    console.log("User Fetched Successfully");
    // console.log(user.name);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})




// Validation middleware
const validateDeleteLogin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ];
  
// User deleting his/her account using delete request

router.delete('/deleteuser', validateDeleteLogin, async (req,res)=> {
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success, errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        
        if(!user) {
            success = false;
            return res.status(400).json({success, error: 'No such user exist'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: 'Invalid credentials'});            
        }
        
        let userId = user.id;
        // console.log('User ID:',userId);
        const delUser = await User.findByIdAndDelete(userId);
        
        if(delUser){
            success = true;
            return res.status(200).json({success, message: 'User deleted successfully:', userId})
        }
        



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})





module.exports = router;