// client/src/slices/authActions.js
import { login, logout } from './authSlice';
import axios from 'axios';

import axios from 'axios';
import { login } from './authSlice'; // Assuming you have a login action

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/user/register', userData);

    // Handle registration success
    if (response.status === 200) {
      // Dispatch a login action if the user is automatically logged in after registration
      // Here, 'response.data' might contain user data after registration; you can adapt this based on your API response
      dispatch(login(response.data));
    } else {
      // Handle registration failure, e.g., dispatch an error action
      // Depending on your API response structure, you can extract error messages here
      // dispatch(registerError(response.data.error)); // Create a registerError action if needed
    }
  } catch (error) {
    // Handle registration error, e.g., dispatch an error action
    console.error('Registration error:', error);
    // dispatch(registerError('An error occurred during registration')); // Create a registerError action if needed
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
