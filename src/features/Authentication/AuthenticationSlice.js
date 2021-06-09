import {createSlice} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        clientId: 'd6858e23b252449da9e1b7d71ee74f05',
        redirectUri: 'https://everythingspotify.netlify.app/',
        accessToken: '',

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

export const selectAuthentication = state => state.authentication;
export const {setToken, removeToken} = authenticationSlice.actions;
const authenticationReducer = authenticationSlice.reducer;
export default authenticationReducer;