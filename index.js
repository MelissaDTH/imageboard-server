const express = require('express');
const app = express()

//Initial
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`This app is listening on port ${port}!`));
