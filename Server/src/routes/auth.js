const express = require('express');
const router = express.Router();

const AuthService = require('../services/authService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

    app.use('/auth', router);

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

    router.get('/logged_in', async (req, res, next) => {
        try {
          const { user_id } = req.user;
        
          const cart = await CartServiceInstance.loadCart(user_id);
          const user = await UserServiceInstance.get({ user_id });
        
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
    
