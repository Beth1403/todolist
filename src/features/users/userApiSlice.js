import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Voir commentaires todosApiSlice 
export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes : ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags:['Tasks']
    }),
    signUpUser: builder.mutation({
      query: (userCredentials) => ({
        url: 'signup', 
        method: 'POST',
        body: userCredentials,
      }),
    }),
    
  }),
});

export const { useLoginUserMutation, useSignUpUserMutation } = userApiSlice;
