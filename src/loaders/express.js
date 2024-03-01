const express = require('express')
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('../../');

module.exports = (app) => {

  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.set('trust proxy', 1);

  app.use(
    session({  
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,

       cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  return app;
  
}
