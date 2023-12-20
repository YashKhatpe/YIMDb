const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = ()=> {
    mongoose.connect("mongodb://localhost:27017/")
    console.log("Connected to MongoDb Sucessfully");
}

module.exports = connectToMongo;