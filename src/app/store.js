import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from '../components/Playlists/PlaylistsSlice';
import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import searchReducer from '../features/Search/SearchSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    search: searchReducer,
    playlists: playlistsReducer
  },
});