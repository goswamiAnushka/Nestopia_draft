import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';  // Correct path and filename
import RegisterPage from './Pages/RegisterPage';  // Correct path and filename
import LoginPage from './Pages/LoginPage';  // Correct path and filename

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
