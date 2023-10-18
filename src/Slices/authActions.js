// client/src/slices/authActions.js
import { login, logout } from './authSlice';
import axios from 'axios';


// authActions.js

export const registerUser = (userData) => async (dispatch) => {
  try {
    console.log('Attempting registration...');
    const response = await axios.post('http://localhost:5000/user/register', userData);

    console.log('Registration response:', response);

    if (response.status === 200) {
      console.log('Registration successful');
      // Dispatch an action to update the user state if needed.
      dispatch(login(response.data));
      return { success: 'Registration successful' };
    } else {
      console.error('Registration failed. Status:', response.status);
      if (response.data && response.data.error) {
        console.error('Error message:', response.data.error);
      }
      // Return an error message.
      return { error: 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Handle any error that occurs during the registration process and return an error message.
    return { error: 'Registration failed' };
  }
};













export const loginUser = (userData) => async (dispatch) => {
  try {
    console.log('Attempting login...');
    const response = await axios.post('http://localhost:5000/user/login', userData);

    console.log('Login response:', response);

    if (response.status === 200) {
      console.log('Login successful');
      dispatch(login(response.data)); // Make sure to pass the user data
    } else {
      console.error('Login failed. Status:', response.status);
      if (response.data && response.data.error) {
        console.error('Error message:', response.data.error);
      }
      // Handle login failure
    }
  } catch (error) {
    console.error('Login error:', error);
    // Handle login error
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    // Make an API request to log out the user using Axios
    await axios.get('http://localhost:5000/user/logout');
    dispatch(logout());
  } catch (error) {
    // Handle logout error
    console.error('Logout error:', error);
  }
};


