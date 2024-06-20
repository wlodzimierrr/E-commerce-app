import { createSlice } from '@reduxjs/toolkit';
import { loadSoldItemsForOrder } from './soldItems.action'; 

const initialState = {
  itemsByOrderId: {}, 
  loading: false,
  error: null,
};

const soldItemsSlice = createSlice({
  name: 'soldItems',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSoldItemsForOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSoldItemsForOrder.fulfilled, (state, action) => {
        const { order_id, soldItems } = action.payload;
        state.itemsByOrderId[order_id] = soldItems;
        state.loading = false;
      })
      .addCase(loadSoldItemsForOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : 'Failed to fetch sold items';
      });
  },
});

export default soldItemsSlice.reducer;
