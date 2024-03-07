const createError = require('http-errors');
const CartModel = require('../models/cartModel');
const CartItemModel = require('../models/cartItemModel');


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
            
            const { products: { id: product_id, quantity } } = item;
    
            const cart = await CartModel.findOneByUser(user_id);
            if (!cart) {
                throw new Error('Cart not found');
            }
    
            const cartItem = await CartItemModel.create({ 
                cart_id: cart.id, 
                product_id, 
                quantity 
            });
    
            return cartItem;
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

    async checkout(cart_id, user_id, paymentInfo) {
        
    }
}