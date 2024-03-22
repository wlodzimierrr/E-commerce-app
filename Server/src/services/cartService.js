require('dotenv').config();
const Stripe = require('stripe');
const createError = require('http-errors');
const CartModel = require('../models/cartModel');
const CartItemModel = require('../models/cartItemModel');
const OrderModel = require('../models/orderModel')
const ProductModel = require('../models/productModel');
const SoldItemModel = require('../models/soldItemModel');


module.exports = class CartService {

    async create(data) {

        const { userId } = data;

        try{

            const Cart = new CartModel();
            const cart = await Cart.create(userId);

            return cart;
        } catch (err) {
            throw err;
        }
    };

    async loadCart(userId) {

        try{

            const  cart = await CartModel.findOneByUser(userId);
            const items = await CartItemModel.find(cart.id);
            cart.items = items;
            


            return cart;
        } catch(err) {
            throw err;
        }
    }

    
    async addItem(userId, { product_id, quantity }) {
        try {
            
            let cart = await CartModel.findOneByUser(userId);
            if (!cart) {
                cart = await this.create({ userId })
            }
            const existingItems = await CartItemModel.find(cart.id);
            const existingItem = existingItems.find(item => item.id === product_id);
          
            if (existingItem) {
                const updatedQuantity = existingItem.quantity + quantity;
                const updatedItem = await CartItemModel.update(existingItem.cartItemId, { quantity: updatedQuantity });
                return updatedItem;
            } else {
                const cartItem = await CartItemModel.create({ cart_id: cart.id, product_id, quantity });
                return cartItem;
            }

        } catch(err) {
            throw err;
        }
    }
    

    async updateItem(cartItemId, data) {
        
        try{
            const cartItem = await CartItemModel.update(cartItemId, data)
        
            return cartItem;
        } catch(err) {
            throw err;
        }
    }

    async removeItem(cartItemId) {

        try{
            const cartItem = await CartItemModel.delete(cartItemId)

            return cartItem;
            
        } catch(err) {
            throw err;
        }
    }


    async checkout(cartId, user_id, paymentInfo) {
        try {
      // Init Stripe with secret key
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    
      // Load cart items
        const cartItems = await CartItemModel.find(cartId);

      // Generate total price from cart items
      const total = cartItems.reduce((total, item) => {
        return total += Number(item.price) * item.quantity;
    }, 0);
    

      // Generate initial order
        const Order = new OrderModel({ total, user_id });
        await Order.create();
         Order.addItems(cartItems);
      
      
      // Make charge to payment method
        await stripe.charges.create({
            amount: total,
            currency: 'usd',
            source: paymentInfo.id,
            description: 'E-commerce App charge'
        })

        async function addSoldItems(order) {
            const addResults = []; 
            for (const item of order.items) { 
                const soldItemData = {
                    order_id: item.order_id,
                    model: item.model, 
                    product_id: item.product_id,
                    price: item.price,
                    quantity: item.quantity,
                };
                try {
                    const result = await SoldItemModel.create(soldItemData);
                    addResults.push(result); 
                } catch (error) {
                    console.error(error);
                    addResults.push({ error: true, message: error.message });
                }
            } 
            return addResults; 
        }
        try {
            const results = await addSoldItems(Order);
            return results
        } catch (error) {
            console.error('Failed to initiate sold items addition:', error);
        }
        
      // On successful charge to payment method, update order status to COMPLETE
        const order = await Order.update({ status: 'COMPLETE' });

        async function updateProductQuantities(orderItems) {
            if (order.status === 'COMPLETE') {
                const updateResults = []; 
                for (const item of orderItems) {
                    const id = item.id; 
                    const purchasedQuantity = item.quantity;
                    const currentStockQuantity = item.stock_quantity;
                    const newStockQuantity = currentStockQuantity - purchasedQuantity;
        
                    if (newStockQuantity < 0) {
                        console.error(`Cannot reduce stock below zero for product ID ${id}.`);
                        continue; 
                    }
        
                    try {
                        const result = await ProductModel.update({ id, stock_quantity: newStockQuantity });
                        updateResults.push(result);
                    } catch (error) {
                        console.error(error);
                    }
                }
                return updateResults; 
            }
        }
        
        try {
            const updateResults = await updateProductQuantities(cartItems);
            console.log('Update results:', updateResults);
        } catch (error) {
            console.error('Failed to update product quantities:', error);
        }

        async function deleteCartAndCartItems(orderItems, cartId) {
            if (order.status === 'COMPLETE') {
                for (const item of orderItems) {
                    const cartItemId = item.cartItemId
                    await CartItemModel.delete(cartItemId)
                }
                await CartModel.delete(cartId)
            }
        }
        try {
            const result =  await deleteCartAndCartItems(cartItems, cartId)
           return result
        } catch (error) {
            console.error(error);
        }

        return order;

        } catch(err) {
        throw err;
        }
    }

}