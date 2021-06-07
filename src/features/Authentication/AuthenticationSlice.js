import {createSlice} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: false,
    reducers: {
        authenticate: (state, action) => {
            state = action.payload.isSignedIn;
            return state;
        }
    }
});

export const selectAuthentication = state => state.authentication;
export const {authenticate} = authenticationSlice.actions;
const authenticationReducer = authenticationSlice.reducer;
export default authenticationReducer;