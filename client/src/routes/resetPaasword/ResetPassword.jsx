// ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './reset-password.scss';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await apiRequest.post('/auth/reset-password', { email, otp, password });
      setMessage(res.data.message);
      console.log('Reset Password Response:', res.data); // Add this line to log the response
    } catch (err) {
      setError(err.response.data.message || 'Error resetting password');
    }
  };

  return (
    <div className="reset-password">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {message && <span className="message">{message}</span>}
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default ResetPassword;
