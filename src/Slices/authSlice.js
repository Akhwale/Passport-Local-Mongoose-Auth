// client/src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, register } = authSlice.actions;


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
      dispatch(login(response.data));
    } else {
      console.error('Login failed. Status:', response.status);
      if (response.data && response.data.error) {
        console.error('Error message:', response.data.error);
      }
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get('http://localhost:5000/user/logout');
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export default authSlice.reducer;
