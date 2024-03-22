import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder, fetchOrders, fetchOrdersWithSoldItems } from '../../apis/orders';

export const loadOrder = createAsyncThunk(
  'orders/loadOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await fetchOrder(orderId);
      return {
        order: response
      };
    } catch(err) {
      throw err;
    }
  }
);

export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async (params, thunkAPI) => {
    try {
      const response = await fetchOrders();
      return {
        orders: response
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loadOrdersAndSoldItems = createAsyncThunk(
  'orders/loadOrdersAndSoldItems',
  async (_, { rejectWithValue }) => {
    try {
      const ordersWithSoldItems = await fetchOrdersWithSoldItems();
      return ordersWithSoldItems;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);