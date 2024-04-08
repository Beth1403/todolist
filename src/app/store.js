import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import todoReducer from '../features/todos/todoSlice';
import userReducer from '../features/users/userSlice';
import { userApiSlice } from '../features/users/userApiSlice';
import { todosApiSlice } from '../features/todos/todosApiSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { persistStore } from 'redux-persist';

// Configuration de Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combine tous les reducers
const rootReducer = combineReducers({
  todos: todoReducer,
  user: userReducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [todosApiSlice.reducerPath]: todosApiSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/RESUME', 'persist/PURGE', 'persist/REGISTER'],
      },
    }).concat(userApiSlice.middleware, todosApiSlice.middleware),
});


export const persistor = persistStore(store);
