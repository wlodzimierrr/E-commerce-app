import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';

// Import your components
import Home from './routes/home'
import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import Login from './routes/login';

function App() {


  return (
    <Router> 
      <Layout>
        <HeaderComponent />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Private Routes */}
            {/* Redirect any unknown routes to the home page */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        <FooterComponent />
      </Layout>
    </Router>
  );
}

export default App;
