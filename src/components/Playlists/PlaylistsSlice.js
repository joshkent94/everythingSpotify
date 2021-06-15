import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPlaylists = createAsyncThunk(
    'playlists/loadPlaylists',
    async({accessToken}) => {
        const urlToSend = `https://api.spotify.com/v1/me/playlists`;
        const response = await fetch(urlToSend, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const jsonResponse = await response.json();
        let playlists = jsonResponse.items.map(playlist => {
            let playlistInfo = {
                'id': playlist.id,
                'name': playlist.name,
                'uri': playlist.uri
            }
            return playlistInfo;
        });
        return playlists;
    }
);

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        isLoading: false,
        isRejected: false,
        playlists: []
    },
    extraReducers: {
        [loadPlaylists.pending]: (state, action) => {
            state.isLoading = true;
            state.isRejected = false;
        },
        [loadPlaylists.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isRejected = false;
            state.playlists = action.payload;
        },
        [loadPlaylists.rejected]: (state, action) => {
            state.isRejected = true;
            state.isLoading = false;
        }
    }
});

export const selectPlaylists = state => state.playlists.playlists;
export const selectIsPlaylistsLoading = state => state.playlists.isLoading;
export const selectIsPlaylistsRejected = state => state.playlists.isRejected;
const playlistsReducer = playlistsSlice.reducer;
export default playlistsReducer;