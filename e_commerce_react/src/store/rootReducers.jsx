import { combineReducers } from "redux";
import productReducer from './products/products.reducers';

export default combineReducers({
    products: productReducer,
});