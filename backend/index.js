const mongoose = require('./db');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = 5000
app.use(cors()); // Enable CORS for all routes
// Middleware
app.use(bodyParser.json());



app.use('/api/auth', require('./routes/auth'));
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
