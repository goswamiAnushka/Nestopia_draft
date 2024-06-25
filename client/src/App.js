import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
