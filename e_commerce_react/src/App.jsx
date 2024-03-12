import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import your components


function App() {

  

  return (
    <div style={{ flex: 1 }}>
      <Router>

        <Routes>
          {/* Public Routes */}
          {/* Private Routes */}
           {/* Redirect any unknown routes to the home page */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
         
      </Router>
    </div>
  );
}

export default App;
