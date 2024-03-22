const createError = require('http-errors');
const OrderModel = require('../models/orderModel');
const OrderItemModel = require('../models/orderItemModel');
const SoldItemModel = require('../models/soldItemModel');
const ProductModel = require('../models/productModel');

module.exports = class OrderService {

    async create(data) {

        const { userId } = data;

        try {

            const Order = new OrderModel();
            const order = await order.create( { userId, total} );

            return cart;

        } catch(err) {
            throw err;
          }
    
    };

    async list(userId) {

        try{
            const orders = await OrderModel.findByUser(userId);

            return orders;

        } catch(err) {
          throw err;
        }
      }

    async findById(orderId) {

        try{

            const order = await OrderModel.findById(orderId);

            return order;
        } catch(err) {
            throw err;
          }
    }

    async findOrdersWithDetails(userId) {
        try {
            const orders = await OrderModel.findByUser(userId);
            const ordersWithDetails = await Promise.all(orders.map(async (order) => {
                const soldItems = await SoldItemModel.findOneByOrderId(order.id);
                const detailedSoldItems = await Promise.all(soldItems.map(async (item) => {
                    const product = await ProductModel.findOne(item.product_id);
                    return { ...item, productDetails: product || {} };
                }));
                return { ...order, soldItems: detailedSoldItems };
            }));
            return ordersWithDetails;
        } catch (err) {
            console.error("Failed to fetch orders with details:", err);
            throw createError(500, "Failed to fetch orders with details.");
        }
    }
};


