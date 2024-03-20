const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../loaders/jwt')

const AuthService = require('../services/authService');
const AuthServiceInstance = new AuthService();
const CartService = require('../services/cartService');
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel();
const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

    app.use('/api/auth', router);

    router.post('/register', async (req, res, next) => {

        try{
            const data = req.body;
            const response = await AuthServiceInstance.register(data);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {

        try {
            const { username, password } = req.body;
            const { user, token } = await AuthServiceInstance.login({ email: username, password });
            
            res.status(200).send({ user, token });
            } catch (err) {
            next(err);
            }

    });

    router.get('/logged_in', authenticateToken, async (req, res, next) => {
      try {
          const userIdentifier = req.user.email;
    
          // Initialize user variable
          let user;
      
          // Determine if the identifier is an email or username
          if (userIdentifier && userIdentifier.includes('@')) {
              // Find by email
              user = await UserModelInstance.findByEmail(userIdentifier);
          } else {
              // Find by username
              user = await UserModelInstance.findOneByUsername(userIdentifier);
          }
          
          // User not found
          if (!user) {
              return res.status(404).send({ message: "User not found" });
          }
          
          // Load user's cart
          const cart = await CartServiceInstance.loadCart(user.user_id);
          
          // Send response
          res.status(200).send({
              cart,
              loggedIn: true,
              user
          });
      } catch(err) {
          next(err);
      }
    });
    
  
}
    
