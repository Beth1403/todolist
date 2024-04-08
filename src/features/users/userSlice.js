import { createSlice } from '@reduxjs/toolkit';
import { userApiSlice } from './userApiSlice';

export const { useLoginUserMutation } = userApiSlice;

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    userDetails: null, 
    token: localStorage.getItem('jwtToken'), 
    status: 'idle', // Reqûete en 'repos', pas encore initialisée
    error: null, 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userDetails = null;
      localStorage.removeItem('jwtToken');
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user; 
        state.userDetails = payload.user; 
        state.token = payload.token;
        state.status = 'succeeded';
        localStorage.setItem('jwtToken', payload.token);
      }
    ).addMatcher(
      userApiSlice.endpoints.loginUser.matchRejected,
      (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
    );
  }
});

export const { logout, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
