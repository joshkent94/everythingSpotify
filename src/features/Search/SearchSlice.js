import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk(
    'search/fetchResults',
    async({searchTerm, accessToken}) => {
        const urlToSend = `https://api.spotify.com/v1/search?type=track,album,artist&q=${searchTerm}&limit=50`;
        const response = await fetch(urlToSend, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const jsonResponse = await response.json();
        return jsonResponse;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: '',
        results: ''
    },
    reducers: {
        setTerm: (state, action) => {
            state.searchTerm = action.payload.searchTerm;
        }
    },
    extraReducers: {
        [fetchResults.pending]: (state, action) => {
            return;
        },
        [fetchResults.fulfilled]: (state, action) => {
            return;
        },
        [fetchResults.rejected]: (state, action) => {
            return;
        }
    }
});

export const selectSearchTerm = state => state.search.searchTerm;
export const selectSearchResults = state => state.search.results;
export const {setTerm, setResults} = searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;