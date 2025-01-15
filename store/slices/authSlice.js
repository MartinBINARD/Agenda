import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idToken: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.idToken = action.payload;
        },
    },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
