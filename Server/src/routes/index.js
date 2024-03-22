const userRouter = require('./user');
const authRouter = require('./auth');
const productRouter = require('./product')
const cartRouter = require('./cart')
const orderRouter = require('./order');
const soldItems = require('./soldItems');

module.exports = (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    productRouter(app);
    cartRouter(app);
    orderRouter(app);
    soldItems(app);
  }