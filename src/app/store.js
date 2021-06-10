import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import searchReducer from '../features/Search/SearchSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    search: searchReducer
  },
});