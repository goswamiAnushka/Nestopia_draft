import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePages from './Pages/HomePage';  // Correct path and filename
import RegisterPage from './pages/RegisterPage';  // Correct path and filename
import LoginPage from './Pages/LoginPage';  // Correct path and filename

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPge />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
