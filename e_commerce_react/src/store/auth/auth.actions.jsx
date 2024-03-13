import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, isLoggedIn, register, logout } from '../../apis/auth'
import API from '../../apis/client'

export const checkLoginStatus = createAsyncThunk(
    'auth/checkLogin',
    async (param, thunkAPI) => {
        try {
            const response = await isLoggedIn();
        
            return {
                cart: response.cart,
                isAuthenticated: true,
                user: response.user
            }
        } catch(err) {
            // Example of using rejectWithValue to provide more detailed error info
            return thunkAPI.rejectWithValue({ message: 'Failed to verify login status', error: err });
        }
    }
);

export const loginUser = createAsyncThunk (
    'auth/loginUser',
    async (credentials, thunkAPI) => {
        try {
            const response = await login(credentials);

            const { token } = response

            localStorage.setItem('token', token);
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (response.user) {
            thunkAPI.dispatch(checkLoginStatus());
            
            }
            return {
            user: response.user, 
            isAuthenticated: true
            }
        } catch(err) {
            
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            logout(); 

            localStorage.removeItem('token');
            delete API.defaults.headers.common['Authorization'];

            return { isAuthenticated: false };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials, thunkAPI) => {
        try {
            await register(credentials);
            return {};
        } catch(err) {
            throw err;
        }
    }
);