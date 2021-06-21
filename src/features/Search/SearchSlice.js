import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loadFavourites = createAsyncThunk(
    'search/loadFavourites',
    async({accessToken}) => {
        const urlToSend = `https://api.spotify.com/v1/me/top/tracks?limit=20`;
        const response = await fetch(urlToSend, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const jsonResponse = await response.json();
        let tracks = jsonResponse.items.map(track => {
            let trackInfo = {
                'id': track.id,
                'name': track.name,
                'artist': track.artists[0].name,
                'album': track.album.name,
                'uri': track.uri
            };
            return trackInfo;
        });
        return tracks;
    }
);

export const fetchResults = createAsyncThunk(
    'search/fetchResults',
    async({searchTerm, accessToken}) => {
        const urlToSend = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}&limit=20`;
        const response = await fetch(urlToSend, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const jsonResponse = await response.json();
        let tracks = jsonResponse.tracks.items.map(track => {
            let trackInfo = {
                'id': track.id,
                'name': track.name,
                'artist': track.artists[0].name,
                'album': track.album.name,
                'uri': track.uri
            }
            return trackInfo;
        });
        return tracks;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: '',
        results: [],
        isLoading: false,
        isRejected: false,
    },
    reducers: {
        setTerm: (state, action) => {
            state.searchTerm = action.payload.searchTerm;
        },
        setRejected: (state, action) => {
            state.isRejected = action.payload;
        }
    },
    extraReducers: {
        [fetchResults.pending]: (state, action) => {
            state.isLoading = true;
            state.isRejected = false;
        },
        [fetchResults.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isRejected = false;
            state.results = action.payload;
        },
        [fetchResults.rejected]: (state, action) => {
            state.isRejected = true;
            state.isLoading = false;
        },
        [loadFavourites.pending]: (state, action) => {
            state.isLoading = true;
            state.isRejected = false;
        },
        [loadFavourites.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isRejected = false;
            state.results = action.payload;
        },
        [loadFavourites.rejected]: (state, action) => {
            state.isRejected = true;
            state.isLoading = false;
        },
    }
});

export const selectSearchTerm = state => state.search.searchTerm;
export const selectSearchResults = state => state.search.results;
export const selectIsLoading = state => state.search.isLoading;
export const selectIsRejected = state => state.search.isRejected;
export const {setTerm, setRejected} = searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;