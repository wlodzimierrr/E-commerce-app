const express = require('express');
const app = express();

const loaders = require('./src/loaders/');

const { PORT } = require('./config');

async function startServer() {
  
  loaders(app);
  
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();