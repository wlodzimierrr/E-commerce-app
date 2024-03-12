import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import your components
import Home from './routes/home'

function App() {

  

  return (
      <Router>
        
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          {/* Private Routes */}
           {/* Redirect any unknown routes to the home page */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  );
}

export default App;
