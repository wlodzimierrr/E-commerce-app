const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../loaders/jwt');
const CartService = require('../services/cartService');
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel();

const CartServiceInstance = new CartService();

module.exports = (app) => {

    app.use('/api/carts', router);

    router.use(authenticateToken);

    router.get('/cart', async (req, res, next) => {
        try {
            const userIdentifier = req.user.email;
            let user;
        
            if (userIdentifier && userIdentifier.includes('@')) {
                user = await UserModelInstance.findByEmail(userIdentifier);
            } else {
                user = await UserModelInstance.findOneByUsername(userIdentifier);
            }
            const response = await CartServiceInstance.loadCart(user.id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.post('/cart', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const response = await CartServiceInstance.create({ userId });
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });

    router.post('/cart/items', async (req, res, next) => {
        try {
            const userIdentifier = req.user.email;
            let user;
        
            if (userIdentifier && userIdentifier.includes('@')) {
                user = await UserModelInstance.findByEmail(userIdentifier);
            } else {
                user = await UserModelInstance.findOneByUsername(userIdentifier);
            }
            const data = req.body;
            
            const response = await CartServiceInstance.addItem(user.id, data);
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });

    router.put('/cart/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const updateData = req.body; 
            const response = await CartServiceInstance.updateItem(cartItemId, updateData);
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });

    router.delete('/cart/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const response = await CartServiceInstance.removeItem(cartItemId);
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });

    router.post('/cart/checkout', async (req, res, next) => {
        try {
            const id = req.user.id;
            const { cartId, paymentInfo } = req.body;
            const response = await CartServiceInstance.checkout(cartId, id ,paymentInfo);
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });
};