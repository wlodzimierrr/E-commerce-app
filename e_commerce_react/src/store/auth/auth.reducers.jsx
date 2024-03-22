import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, loginUser, registerUser, logoutUser, deleteUser } from "./auth.actions";

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    error: null
  }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

        .addCase(checkLoginStatus.fulfilled, (state, action) => {
            const { isAuthenticated } = action.payload;
            state.isAuthenticated = isAuthenticated;
        })

        .addCase(loginUser.fulfilled, (state, action) => {
            const { isAuthenticated } = action.payload;
            state.isAuthenticated = isAuthenticated;
        })

        .addCase(loginUser.rejected, (state, action) => {
            const { error } = action.payload;
            state.isAuthenticated = false;
            state.error = error;
        })

        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            const { error } = action.payload;
            state.isAuthenticated = false;
            state.error = error;
        })
          
        .addCase(registerUser.rejected, (state, action) => {
            const { error } = action.payload;
            state.isAuthenticated = false;
            state.error = error;
        })


        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false; 
        state.error = null; 
        })
        .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        })
    }      
});

export default authSlice.reducer;