import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './forgot-password.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await apiRequest.post('/auth/forgot-password', { email });
      setMessage(res.data.message);
      alert('OTP has been sent to your email');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err.response.data.message || 'Error sending OTP');
    }
  };

  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
        {message && <span className="message">{message}</span>}
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default ForgotPassword;
