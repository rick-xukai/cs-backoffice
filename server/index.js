const express = require('express');
const path = require('path');

const app = express();

const workingDir = process.cwd();
const buildDir = path.resolve(workingDir, 'build');

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
