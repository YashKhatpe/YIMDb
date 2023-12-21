// const connectToMongo = require('./db');
const express = require('express')
// connectToMongo();
const app = express()
const port = 5000


// app.use('/api/auth', require('./routes/auth'));
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// main.js









// const fs = require('fs');

// // Read the content of the JSON file
// const rawData = fs.readFileSync('config.json');
// const config = JSON.parse(rawData);

// // Access the TMDB API key
// const tmdbApiKey = config.tmdbApiKey;

// // Now you can use tmdbApiKey in your API requests
// console.log(`TMDB API Key: ${tmdbApiKey}`);