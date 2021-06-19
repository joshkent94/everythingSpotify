import {createSlice} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        clientId: 'd6858e23b252449da9e1b7d71ee74f05',
        redirectUri: 'http://localhost:3000/',
        accessToken: ''
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload.token;
        },
        removeToken: (state, action) => {
            state.accessToken = action.payload.token;
        }
    }
});

export const selectClientId = state => state.authentication.clientId;
export const selectRedirectUri = state => state.authentication.redirectUri;
export const selectAccessToken = state => state.authentication.accessToken;
export const {setToken, removeToken} = authenticationSlice.actions;
const authenticationReducer = authenticationSlice.reducer;
export default authenticationReducer;