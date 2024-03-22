const express = require('express')
const router = express.Router();
const SoldItemService = require('../services/soldItemsService')
const SoldItemServiceInstance = new SoldItemService();


module.exports = (app) => {

    app.use('/api/solditems', router);

    router.get('/:order_id', async (req, res, next) => {
        try {
            const { order_id } = req.params;

            const response = await SoldItemServiceInstance.list(order_id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

}