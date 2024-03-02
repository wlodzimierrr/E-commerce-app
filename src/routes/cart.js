const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');

const CartServiceInstance = new CartService();

module.exports = (app) => {

    app.use('/carts', router);

    router.get ('/mycart', async (req, res, next) => {

        try{
            const { user_id } = req.body.users;

            const response = await CartServiceInstance.loadCart(user_id);
            res.status(200).send(response);

        } catch(err) {
            next(err);
          }
    });

    router.put('/mycart', async (req, res, next) => {

        try{
            const { user_id } = req.body.users;
            

            const response = await CartServiceInstance.update( { user_id });
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    
    router.post('/mycart', async (req, res, next) => {

        try{
            const { user_id } = req.body.users;

            const response = await CartServiceInstance.create({ user_id: user_id });
            res.status(200).send(response);

        } catch (err) {
             next(err);
        }
    });

    router.post('/mycart/items', async (req, res, next) => {

        try {
             const { user_id } = req.body.users;
             const data = req.body;
             
             const response = await CartServiceInstance.addItems(user_id, data);
             res.status(200).send(response);

        } catch (err) {
             next(err);
        }
    });

    router.put('/mycart/items/:cartItemId', async (req, res, next) => {

        try{
            const { cartItemId  } = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateItem(cartItemId , data)
            res.status(200).send(response);

        } catch (err) {
             next(err);
        }
    });

    router.delete('/mycart/items/:cartItemId', async (req, res, next) => {

        try{
            const {cartItemId} = req.params;

            const response = await CartServiceInstance.removeItem(cartItemId)
            res.status(200).send(response);

        } catch(err) {
          next(err);
        }
    });``

    router.post('/mycart/checkout', async (req, res, next) => {
        
      });
};