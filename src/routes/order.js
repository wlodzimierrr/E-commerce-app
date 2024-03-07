const express = require('express');
const router = express.Router();

const OrderService = require('../services/orderServices');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {

    app.use('/orders', router);

    router.get ('/', async (req, res, next) => {

        try {
            const {user_id} = req.body.user;

            const response = await OrderServiceInstance.list(user_id)
            res.status(200).send(response);

        } catch(err) {
            next(err);
          }
    });
    

    router.get('/:order_id', async (req, res, next) => {

        try {
            const { order_id } = req.params;

            const response = await OrderServiceInstance.findById(order_id);
            res.status(200).send(response);

        } catch(err) {
            next(err);
          }
    });

}