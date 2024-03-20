const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService');

const CartServiceInstance = new CartService();

module.exports = (app) => {

    app.use('/api/carts', router);

    router.get ('/cart', async (req, res, next) => {

        try{
            const { user_id } = req.body.users;

            const response = await CartServiceInstance.loadCart(user_id);
            res.status(200).send(response);

        } catch(err) {
            next(err);
          }
    });

    router.put('/cart', async (req, res, next) => {

        try{
            const { user_id } = req.body.users;
            

            const response = await CartServiceInstance.update( { user_id });
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    
    router.post('/cart', async (req, res, next) => {

        try{
            const { user_id } = req.body.users;

            const response = await CartServiceInstance.create({ user_id: user_id });
            res.status(200).send(response);

        } catch (err) {
             next(err);
        }
    });

    router.post('/cart/items', async (req, res, next) => {

        try {
             const { id } = req.user;
             const data = req.body;
             
             const response = await CartServiceInstance.addItem(id, data);
             res.status(200).send(response);

        } catch (err) {
             next(err);
        }
    });

    router.put('/cart/items/:cartItemId', async (req, res, next) => {

        try{
            const { cartItemId  } = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateItem(cartItemId , data)
            res.status(200).send(response);

        } catch (err) {
             next(err);
        }
    });

    router.delete('/cart/items/:cartItemId', async (req, res, next) => {

        try{
            const {cartItemId} = req.params;

            const response = await CartServiceInstance.removeItem(cartItemId)
            res.status(200).send(response);

        } catch(err) {
          next(err);
        }
    });

    router.post('/cart/:cartId/checkout', async (req, res, next) => {

        try {
            const { user_id } = req.body.users;
            const { cartId } = req.params
            const { payment_info } = req.body; 
            
            const response = await CartServiceInstance.checkout(cartId, user_id, payment_info);
      
            res.status(200).send(response);
          } catch(err) {
            next(err);
          }
      });
};