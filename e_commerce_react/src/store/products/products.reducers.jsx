import { createSlice } from "@reduxjs/toolkit";
import { loadProduct, loadProducts } from "./products.action";

const initialState = {}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(loadProduct.fulfilled, (state, action) => {
          const { product } = action.payload;
          state[product.id] = product;
        })
        .addCase(loadProducts.fulfilled, (state, action) => {
          const { products } = action.payload;
          products.forEach((product) => {
            const { id } = product;
            state[id] = product;
          });
        })
    }
  });
  
  export default productSlice.reducer;