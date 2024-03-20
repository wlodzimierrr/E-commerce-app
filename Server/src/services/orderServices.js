const createError = require('http-errors');
const OrderModel = require('../models/orderModel');
const OrderItemModel = require('../models/orderItemModel');

module.exports = class OrderService {

    async create(data) {

        const { user_id } = data;

        try {

            const Order = new OrderModel();
            const order = await order.create( { user_id, total} );

            return cart;

        } catch(err) {
            throw err;
          }
    
    };

    async list(user_id) {

        try{
            const orders = await OrderModel.findByUser(user_id);

            return orders;

        } catch(err) {
          throw err;
        }
      }

    async findById(order_id) {

        try{

            const order = await OrderModel.findById(order_id);

            return order;
        } catch(err) {
            throw err;
          }
    }
}