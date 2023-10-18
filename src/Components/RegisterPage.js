import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { registerUser } from '../Slices/authActions';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the history object from React Router

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    // Add other registration fields here
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistrationMessage(''); // Reset any previous registration message

    try {
      const response = await dispatch(registerUser(formData)); // Dispatch registerUser action
      if (response.success) {
        setRegistrationMessage(response.success);
        // Redirect to the login page upon successful registration
        window.location = '/login';
      } else {
        setRegistrationMessage(response.error);
      }
    } catch (err) {
      setRegistrationMessage('Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <div>
      <div>
        {registrationMessage && <p>{registrationMessage}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {/* Add other registration fields here */}
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
