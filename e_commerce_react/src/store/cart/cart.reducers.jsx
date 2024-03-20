import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/auth.actions';
import { addItem, checkoutCart, loadCart, removeItem, updateItem } from './cart.actions';

const initialState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items.push(item);
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })

      .addCase(updateItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items.push(item);
      })

      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items = state.items.filter((product) => product.cartItemId !== item);
      })
  }
});

export default cartSlice.reducer;