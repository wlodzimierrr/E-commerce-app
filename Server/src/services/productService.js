const createError = require('http-errors');
const ProductModel = require('../models/productModel')
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {

    async list(options) {

        try{
            const products = await ProductModelInstance.find(options)
            
            return products;

        } catch(err) {
            throw err
        }
    };

    async get(productId) {

        try{
            const product = await ProductModelInstance.findOne(productId);

            if (!product) {
                throw createError(404, 'Product not found');
            }

            return product;

        } catch(err) {
            throw err;
        }
    };

    async update(data) {

        try{

            const user = await ProductModelInstance.update(data);

            return user;

        } catch(err) {
            throw err;
        }

    };
}