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
        const playlists = jsonResponse.items.map(playlist => {
            let playlistInfo = {
                'id': playlist.id,
                'name': playlist.name,
                'uri': playlist.uri,
                'tracks': []
            }
            return playlistInfo;
        });
        return playlists;
    }
);

export const loadPlaylistTracks = createAsyncThunk(
    'playlists/loadPlaylistTracks',
    async({accessToken, playlist}) => {

        const trackArray = async() => {
            const urlToSend = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
            const response = await fetch(urlToSend, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            const jsonResponse = await response.json();
            const tracks = jsonResponse.items.map(track => {
                let trackInfo = {
                    'id': track.track.id,
                    'name': track.track.name,
                    'artist': track.track.artists[0].name,
                    'album': track.track.album.name,
                    'uri': track.track.uri
                }
                return trackInfo;
            });
            return tracks;
        };

        const newPlaylist = {
            ...playlist,
            'tracks': await trackArray()
        };

        return newPlaylist;
    }
);

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        isLoading: false,
        isRejected: false,
        playlists: [],
        playlistSelect: false,
        trackToAdd: ''
    },
    reducers: {
        setPlaylistSelect: (state, action) => {
            state.playlistSelect = action.payload;
        },
        setTrackToAdd: (state, action) => {
            state.trackToAdd = action.payload;
        }
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
        },
        [loadPlaylistTracks.pending]: (state, action) => {
            state.isRejected = false;
        },
        [loadPlaylistTracks.fulfilled]: (state, action) => {
            const {id, tracks} = action.payload;
            state.isLoading = false;
            state.isRejected = false;
            state.playlists = state.playlists.map(playlist => {
                if(playlist.id === id) {
                    return {
                        ...playlist,
                        'tracks': tracks
                    };
                } else {
                    return playlist;
                };
            });
        },
        [loadPlaylistTracks.rejected]: (state, action) => {
            state.isRejected = true;
            state.isLoading = false;
        }
    }
});

export const selectPlaylists = state => state.playlists.playlists;
export const selectIsPlaylistsLoading = state => state.playlists.isLoading;
export const selectIsPlaylistsRejected = state => state.playlists.isRejected;
export const selectPlaylistSelect = state => state.playlists.playlistSelect;
export const selectTrackToAdd = state => state.playlists.trackToAdd;
export const {setPlaylistSelect, setTrackToAdd} = playlistsSlice.actions;
const playlistsReducer = playlistsSlice.reducer;
export default playlistsReducer;