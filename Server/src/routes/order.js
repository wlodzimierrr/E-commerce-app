const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../loaders/jwt');
const OrderService = require('../services/orderServices');
const OrderServiceInstance = new OrderService();



module.exports = (app) => {

    router.use(authenticateToken);

    app.use('/api/orders', router);

    router.get('/', async (req, res, next) => {
        try {
           
            const userId = req.user.id;
            const response = await OrderServiceInstance.list(userId);
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

    router.get('/order/with-details', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const detailedOrders = await OrderServiceInstance.findOrdersWithDetails(userId);
            
            res.json(detailedOrders);
        } catch (err) {
            console.error("Error in /order/with-details route:", err);
            res.status(500).send({ message: "Error fetching orders with details" });
        }
    });
    
}