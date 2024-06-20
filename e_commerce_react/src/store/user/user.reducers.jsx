import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser } from '../auth/auth.actions';
import { fetchUserDetails, updateUserDetails } from '../user/user.actions';


const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
      })
    .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload; 
        state.error = null;
      })
    .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    })
  }
});

export default userSlice.reducer;
