import { combineReducers } from "redux";
import productReducer from './products/products.reducers';
import userReducer from './user/user.reducers';
import authReducer from './auth/auth.reducers';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    products: productReducer,
});