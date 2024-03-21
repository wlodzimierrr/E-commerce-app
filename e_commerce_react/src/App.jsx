import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { setAuthToken } from './apis/client'
import './App.css';

// Import your components
import Home from './routes/home'
import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import PrivateRoute from './components/privateRoute'
import Login from './routes/login';
import ProductDetails from './routes/productDetails';
import Cart from './routes/cart';
import Register from './routes/register'
import Account from './routes/account'
// import Orders from './routes/orders'
// import Checkout from './routes/checkout';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router> 
      <Layout>
        <HeaderComponent />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            {/* Private Routes */}
            <Route path='/cart' element={<PrivateRoute children={<Cart />} />} />
            {/* <Route path='/checkout' element={<PrivateRoute children={<Checkout />} />} /> */}
            <Route path='/account' element={<PrivateRoute children={<Account />} />} />
            {/* <Route path='/orders' element={<PrivateRoute children={<Orders />} />} /> */}
            {/* Redirect any unknown routes to the home page */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        <FooterComponent />
      </Layout>
    </Router>
  );
}

export default App;
