import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: { user: userReducer },
});

// You already have this line:
export type RootState = ReturnType<typeof store.getState>;

// ADD THIS NEW LINE:
export type AppDispatch = typeof store.dispatch;
