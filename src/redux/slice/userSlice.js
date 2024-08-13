import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    users: [],
    active: [],
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userStart: (state) => {
            state.isLoading = true;
        },
        userSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload.type === "a") {
                state.user = action.payload.data;
            }
            else if (action.payload.type === "b") {
                state.users = action.payload.data;
            }
        },
        activeSuccess: (state, action) => {
            state.isLoading = false;
            state.active = action.payload;
        },
        userEnd: (state) => {
            state.isLoading = false;
        }
    },
});

export const {
    userStart,
    userSuccess,
    activeSuccess,
    userEnd,
} = UserSlice.actions;
export default UserSlice.reducer;