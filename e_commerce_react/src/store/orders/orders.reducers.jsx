import { createSlice } from '@reduxjs/toolkit';
import { loadOrder, loadOrders, loadOrdersAndSoldItems } from './orders.actions';

const initialState = {
  byId: {}, 
  allIds: [], 
  loading: false,
  error: null,
};


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.byId[order.id] = order;
        if (!state.allIds.includes(order.id)) {
          state.allIds.push(order.id);
        }
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        orders.forEach(order => {
          state.byId[order.id] = order;
          if (!state.allIds.includes(order.id)) {
            state.allIds.push(order.id);
          }
        });
      })
      .addCase(loadOrdersAndSoldItems.fulfilled, (state, action) => {
        action.payload.forEach(order => {
          state.byId[order.id] = order;
          if (!state.allIds.includes(order.id)) {
            state.allIds.push(order.id);
          }
        });
        state.loading = false;
      })
      
      .addCase(loadOrdersAndSoldItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrdersAndSoldItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });
  
  
  }
});

export default orderSlice.reducer;