const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
});

app.use(express.static(path.join(path.resolve(process.cwd(), 'build'))));

// robots file
const robotPath = path.resolve(process.cwd(), 'robots.txt');
app.get('/robots.txt', (req, res) => res.status(200).sendFile(robotPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(path.resolve(process.cwd(), 'build'), 'index.html'));
});

app.listen(process.env.PORT);