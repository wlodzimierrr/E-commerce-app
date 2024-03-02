const createError = require('http-errors');
const CartModel = require('../models/cart');
const CartItemModel = require('../models/cartItem');


module.exports = class CartService {

    async create(data) {

        const { userId } = data;

        try{

            const Cart = new CartModel();
            const cart = Cart.create(userId);

            return cart;
        } catch (err) {
            throw err;
        }
    };

    async loadCart(userId) {

        try{

            const  cart = await CartModel.findOneByUser(userId);

            const items = CartItemModel.find(cart.id);
            cart.items = items;

            return cart;
        } catch(err) {
            throw err;
        }
    }

    async addItems(userId, item) {

        try{

            const cart = CartModel.findOneByUser(userId);

            const cartItem = CartItemModel.create({ cartId: cart.id, ...item });

            return cartItem;
        } catch(err) {
            throw err;
        }
    }

    async updateItem(cartItemId, data) {
        
        try{
            const cartItem = CartItemModel.update(cartItemId, id)

            return cartItem;
        } catch(err) {
            throw err;
        }
    }
}