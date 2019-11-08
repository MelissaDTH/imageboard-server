const express = require('express');
const app = express()

// For testing
const db = require('./db')
const Image = require('./image/model')

// Routing
const imageRouter = require('./image/router')

//Initial
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`This app is listening on port ${port}!`));

app.use(imageRouter)