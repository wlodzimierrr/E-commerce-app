const express = require('express')
const router = express.Router();
const ProductService = require('../services/productService')
const ProductServiceInstance = new ProductService();


module.exports = (app) => {

    app.use('/products', router);

    router.get('/', async (req, res, next) => {

        try {
            const queryParams = req.query;

            const response = await ProductServiceInstance.get(queryParams);
            res.status(200). send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:ProductId', async (req, res, next) => {

        try {
            const { productId } = req.params;

            const response = await ProductServiceInstance.get(productId);
            res.status(200). send(response);
        } catch(err) {
            next(err);
        }
    });
    
}