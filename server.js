const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const listEndpoints= require("express-list-endpoints");
const PORT = process.env.port || 3000;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET Route for feedback page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
console.log(listEndpoints(app))
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);