const createError = require('http-errors');
const CartModel = require('../models/cartModel');
const CartItemModel = require('../models/cartItemModel');
const ProductModel = require('../models/productModel');
const OrderModel = require('../models/orderModel')


module.exports = class CartService {

    async create(data) {

        const { user_id } = data;

        try{

            const Cart = new CartModel();
            const cart = await Cart.create(user_id);

            return cart;
        } catch (err) {
            throw err;
        }
    };

    async loadCart(user_id) {

        try{

            const  cart = await CartModel.findOneByUser(user_id);
            const items = await CartItemModel.find(cart.cartid);
            cart.items = items;


            return cart;
        } catch(err) {
            throw err;
        }
    }

    async addItems(user_id, item) {
        try {
            
            const { products: { id: product_id, quantity: requestedQuantity } } = item;
    
           
            const cart = await CartModel.findOneByUser(user_id);
            
            if (!cart) {
                throw new Error('Cart not found');
            }
    
            const product = await ProductModel.findOne(product_id);
            if (!product) {
                throw new Error('Product not found');
            }
    
            
            if (product.quantity < requestedQuantity) {
               
                throw new Error(`Only ${product.quantity} units of product ${product_id} available, but ${requestedQuantity} units were requested.`);
            }
    
           
            const cart_item = await CartItemModel.create({ 
                cart_id: cart.cartid, 
                product_id, 
                quantity: requestedQuantity 
            });
    
            
    
            return cart_item;

        } catch(err) {
            console.error('Error adding item to cart:', err);
            throw err; 
        }
    }
    
    

    async updateItem(id, data) {
        
        try{
            const cartItem = await CartItemModel.update(id, data)
        
            return cartItem;
        } catch(err) {
            throw err;
        }
    }

    async removeItem(id) {

        try{
            const cartItem = await CartItemModel.delete(id)

            return cartItem;
            
        } catch(err) {
            throw err;
        }
    }

    async checkout(cart_id, user_id, payment_info) {
        try {

            // const stripe = require("stripe")('sk_test_26PHem9AhJZvU623DfE1x4sd');
            // Load cart items
            const cartItems = await CartItemModel.find(cart_id);
            
          
            // Generate total price from cart items
            const total = cartItems.reduce((total, item) => {
                return total += Number(item.price) * item.quantity;
              }, 0);
      
            // Generate initial order
            const Order = new OrderModel({ user_id, total });
            Order.addItems(cartItems);
            await Order.create();
            
      
            // Make charge to payment method 
            // const charge = await stripe.charges.create({
            //   amount: total,
            //   currency: 'gbp',
            //   source: payment_info.id,
            //   description: 'Charge'
            // });
      
            // On successful charge to payment method, update order status to COMPLETE
            const order = Order.update({ status: 'COMPLETE' });
            
            // Update product quantities if status 'COMPLETE'
            // Assuming cartItems is an array of items where each item has an `id` and a `quantity`

            for (const item of cartItems) {
                // Find the product to update its stock quantity
                const product = await ProductModel.findOne(item.id);
                if (!product) {
                    console.log(`Product with ID ${item.id} not found`);
                    continue; // Skip this iteration if the product is not found
                }

                // Calculate the new stock quantity
                const newStockQuantity = product.stock_quantity - item.quantity;
                
                // Prepare the data for updating the product
                const updateData = {
                    id: item.id,
                    stock_quantity: newStockQuantity, // Assuming the column in your DB is named `stock_quantity`
                    // Include any other fields that need to be updated
                };

                // Update the product in the database
                try {
                    const updatedProduct = await ProductModel.update(updateData);
                    console.log(`Updated product ID ${item.id}:`, updatedProduct);
                } catch (err) {
                    console.error(`Error updating product ID ${item.id}:`, err);
                }
            }

                return order;
      
          } catch(err) {
            throw err;
          }
    }
}
