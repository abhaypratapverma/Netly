import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: null,
    loading: false,
    error: null,
};

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        loadmovie: (state, action) => {
            state.info = action.payload;
            state.loading = false;
            state.error = null;
        },
        removemovie: (state) => {
            state.info = null;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
});

// Export actions
export const { loadmovie, removemovie, setLoading, setError } = movieSlice.actions;

// Export reducer
export default movieSlice.reducer;
