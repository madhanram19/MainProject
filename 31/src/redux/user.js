import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "userDetails",
    reducers: {
        getUserDetails: (state) => {
            state.value += 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;