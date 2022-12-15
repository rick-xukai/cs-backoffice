const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// Create start time file to check whether the deployment is successful
fs.writeFile(path.resolve(process.cwd(), 'build/start-time.txt'), 'Start At: ' + new Date().toLocaleString(), () => {});

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
