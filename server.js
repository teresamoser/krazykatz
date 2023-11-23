const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080;

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    // Allows access from any website
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
