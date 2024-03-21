import { createSlice } from '@reduxjs/toolkit';
import { checkoutCart } from '../cart/cart.actions';
import { loadOrder, loadOrders } from './orders.actions';

const initialState = {}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkoutCart.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        orders.forEach(order => {
          const { id } = order;
          state[id] = order;
        });
      })
  }
});

export default orderSlice.reducer;