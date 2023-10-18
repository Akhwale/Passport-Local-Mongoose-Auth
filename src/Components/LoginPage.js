import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Slices/authActions';

export default function LoginPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error message

    try {
      await dispatch(loginUser(formData)); // Dispatch loginUser action

      // The user data is available in the user variable after a successful login
      if (isAuthenticated) {
        console.log('User data upon successful login:', user);
      }
    } catch (err) {
      setError('Unauthorized access');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, you are logged in as {user.username}</p>
      ) : (
        <div>
          {error && <p>{error}</p>}
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
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}



