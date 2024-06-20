import { combineReducers } from "redux";
import productReducer from './products/products.reducers';
import userReducer from './user/user.reducers';
import authReducer from './auth/auth.reducers';
import cartReducer from './cart/cart.reducers'
import ordersReducer from './orders/orders.reducers'
import soldItemsReducer from "./soldItems/soldItems.reducers";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    soldItems: soldItemsReducer,
});