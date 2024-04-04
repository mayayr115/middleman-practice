const express = require('express');
const path = require('path');
const fetchData = require('../server/utils/fetchData.js');

const app = express();
const PORT = 8080;

const pathToDist = path.join(__dirname, '..', 'app', 'dist');

// const serveStatic = express.static(pathToDist);
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};
// Server fetch to 3rd party api
const fetchAPI = async (req, res) => {
  const API_URL = 'https://pokeapi.co/api/v2/pokemon';
  try {
    const [data, error] = await fetchData(API_URL);
    console.log(data);
    if (data) res.send(data);
  } catch (error) {
    console.log(error.message);
  }
};
app.use(logRoutes);
app.use(express.static(pathToDist));
app.use(fetchAPI);

app.get('/', (req, res) => {  
  res.sendFile(path.join(pathToDist, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});