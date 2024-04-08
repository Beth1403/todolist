import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// createApi, fonction de RTK, pour créer un slice d'API. Encapsule et gère la logique de fetching et de màj de l'état lié à des requêtes api.
export const todosApiSlice = createApi({
  reducerPath: 'todosApi', //Le chemin où le slice sera stocké dans le store
  tagTypes : ['Tasks'], // les tags permettent d'invalider et de rafraîchir automatiquement les données en cache
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL, //l'url est dans le .env
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Chaque endpoint correspond à une opération spécifique
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (newTodo) => ({
        url: 'tasks',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      invalidatesTags: ['Tasks'],
    }),
    getTasks: builder.query({
      query: () => 'tasks',
      providesTags: ['Tasks'],
    }),
    getTask: builder.query({
      query: (id) => `tasks/${id}`,  
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTaskStatus: builder.mutation({
      query: ({ id, completed }) => ({
        url: `tasks/${id}`,
        method: 'PATCH', 
        body: { completed },
      }),
      invalidatesTags: ['Tasks'],
    }),
    
  }),
});

// A partir des endpoints, RTK créé automatiquement des hooks, que l'on peut utiliser dans d'autres parties de l'app.
export const { useAddTaskMutation, useUpdateTaskMutation, useGetTasksQuery, useGetTaskQuery, useDeleteTaskMutation, useUpdateTaskStatusMutation } = todosApiSlice;
