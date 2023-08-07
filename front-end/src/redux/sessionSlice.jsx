import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: 'sessionSlice',
    initialState: { session: undefined, showData: {} },
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        },
        setShowData: (state, action) => {
            state.showData = action.payload;
        }
    },
});

export const { setSession, setShowData } = sessionSlice.actions;
export default sessionSlice;