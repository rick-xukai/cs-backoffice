const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const workingDir = process.cwd();
const buildDir = path.resolve(workingDir, 'build');

// Create start time file to check whether the deployment is successful
fs.writeFile(path.join(buildDir, 'start-time.txt'), 'Start At: ' + new Date().toLocaleString(), () => {});

require('dotenv').config({
  path: path.join(workingDir, '.env'),
});

app.use(express.static(buildDir));

// robots file
const robotPath = path.join(workingDir, 'robots.txt');
app.get('/robots.txt', (req, res) => res.status(200).sendFile(robotPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log('Admin listening on port ' + process.env.PORT);
});
