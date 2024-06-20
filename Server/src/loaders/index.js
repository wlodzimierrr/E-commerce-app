const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');

module.exports = async (app) => {

    const expressApp = await expressLoader(app);

    const passport = await passportLoader(expressApp);

    await routeLoader(app, passport);
    
    await swaggerLoader(app);

    app.use((err, req, res, next) => {
      console.error(err); 

      if (!res.headersSent) {
          const statusCode = err.statusCode || err.status || 500; 
          res.status(statusCode).json({
              message: err.message || 'An unexpected error occurred',
          });
      }
  });
  
  

  }