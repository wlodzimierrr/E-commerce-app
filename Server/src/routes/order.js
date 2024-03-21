const express = require('express');
const router = express.Router();

const OrderService = require('../services/orderServices');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {

    app.use('/api/orders', router);

    router.get ('/', async (req, res, next) => {

        try {
            
            const { userId } = req.query;
            const response = await OrderServiceInstance.list(userId)
            res.status(200).send(response);

        } catch(err) {
            next(err);
          }
    });
    

    router.get('/:orderId', async (req, res, next) => {

        try {
            const { orderId } = req.params;

            const response = await OrderServiceInstance.findById(orderId);
            res.status(200).send(response);

        } catch(err) {
            next(err);
          }
    });

}