const createError = require('http-errors');
const SoldItemModel = require('../models/soldItemModel')
const SoldItemModelInstance = new SoldItemModel();

module.exports = class SoldItemService {
async list(order_id) {

    try{
        const products = await SoldItemModelInstance.findOneByOrderId(order_id)
        
        return products;

    } catch(err) {
        throw err
    }
};
}