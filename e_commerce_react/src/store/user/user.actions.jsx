import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from '../../apis/user'



export const fetchUserDetails = createAsyncThunk(
    'user/fetchDetails',
    async (userId, thunkAPI) => {
      try {
        const response = await fetchUser(userId);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const updateUserDetails = createAsyncThunk(
    'user/updateDetails',
    async ({ id, data }, thunkAPI) => {
        try {
          const updatedUserDetails = await updateUser(id, data);
          return updatedUserDetails;
        } catch(err) {
          return thunkAPI.rejectWithValue(err.response.data);
        }
      }
    );
