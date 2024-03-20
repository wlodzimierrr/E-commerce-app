import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser, updateUserDetails } from '../auth/auth.actions';

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
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
  }
});

export default userSlice.reducer;
