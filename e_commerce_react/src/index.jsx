import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './store/rootReducers'
import { setAuthToken } from './apis/client'
import './index.css';
import reportWebVitals from './reportWebVitals';

// Load the token from storage and set it in the Axios headers
const token = localStorage.getItem('token');
setAuthToken(token);

// Initializes redux store
const store = configureStore({
  reducer: rootReducer
});

// Use createRoot API for React 18
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
