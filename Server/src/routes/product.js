const express = require('express')
const router = express.Router();
const ProductService = require('../services/productService')
const ProductServiceInstance = new ProductService();


module.exports = (app) => {

    app.use('/api/products', router);

    router.get('/', async (req, res, next) => {

        try {
            const queryParams = req.query;

            const response = await ProductServiceInstance.list(queryParams);
            res.status(200). send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:ProductId', async (req, res, next) => {

        try {
            const { ProductId } = req.params;
            
            const response = await ProductServiceInstance.get(ProductId);
            res.status(200). send(response);
        } catch(err) {
            next(err);
        }
    });
    
    router.put('/:ProductId', async (req, res, next) => {
        try{
            const { ProductId } = req.params;
            const { stockQuantity } = req.body;

            const response = await ProductServiceInstance.update( { id: ProductId, stockQuantity });
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
}