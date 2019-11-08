const express = require('express');
const app = express()

// Middlewares
const bodyParser = require("body-parser");
const bodyParserMiddleWare = bodyParser.json();

const cors = require("cors");
const corsMiddleWare = cors();

// Models & DB
const db = require('./db')
const Image = require('./image/model')

// Routing
const imageRouter = require('./image/router')
const authenticationRouter = require('./server/auth/router')

//Initial
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`This app is listening on port ${port}!`));

app
    .use(corsMiddleWare)
    .use(bodyParserMiddleWare)
    .use(imageRouter)
    .use(authenticationRouter)