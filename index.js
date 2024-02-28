const express = require('express');
const app = express();
const { PORT } = require('./config');



async function startServer() {

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();