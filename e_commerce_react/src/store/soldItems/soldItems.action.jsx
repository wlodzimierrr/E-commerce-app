import { createAsyncThunk } from '@reduxjs/toolkit'
import {fetchSoldItems } from '../../apis/soldItems'

export const loadSoldItemsForOrder = createAsyncThunk(
    'solditems/loadSoldItemsForOrder',
    async (order_id, thunkAPI) => {
      try {
        const response = await fetchSoldItems(order_id);
        
        return { order_id, soldItems: response };
      } catch(err) {
        throw err;
      }
    }
  );