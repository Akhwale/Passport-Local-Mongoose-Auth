// client/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
   
    // Add other reducers here as needed
  },
});

export default store;
