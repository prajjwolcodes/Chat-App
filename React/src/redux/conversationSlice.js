import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "convo",
    initialState: {
        selectedConversation: null,
        messages: []
    },
    reducers: {
        selectConversation(state, action) {
            state.selectedConversation = action.payload
        },
        unSelectConversation(state) {
            state.selectedConversation = null
        },
        GetMsg(state, action) {
            state.messages = action.payload
        },
        sendMsg(state, action) {
            state.messages = [...state.messages, action.payload]
        }
    }
})

export const { selectConversation, unSelectConversation, GetMsg, sendMsg } = conversationSlice.actions
export default conversationSlice.reducer