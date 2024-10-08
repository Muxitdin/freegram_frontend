import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMessageLoading: false,
    messages: []
};

const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        messageStart: (state) => {
            state.isMessageLoading = true;
        },
        messageSuccess: (state, action) => {
            state.isMessageLoading = false;
            if (action.payload.type === "set") {
                state.messages = action.payload.data;
            }
            else if (action.payload.type === "push") {
                state.messages.push(action.payload.data);
            }
        },
        // activeMessageSuccess: (state, action) => {
        //     state.isMessageLoading = false;
        //     state.messages.push(action.payload);
        // },
        messageEnd: (state) => {
            state.isMessageLoading = false;
        }
    },
});

export const {
    messageStart,
    messageSuccess,
    activeMessageSuccess,
    messageEnd,
} = MessageSlice.actions;
export default MessageSlice.reducer;