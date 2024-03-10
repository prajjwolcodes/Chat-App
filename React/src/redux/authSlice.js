import { createSlice } from "@reduxjs/toolkit";

const userLoggedIn = JSON.parse(localStorage.getItem("chat-user"))
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: userLoggedIn ? userLoggedIn : null,
        allUsers: []
    },
    reducers: {
        signUp(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null
            localStorage.removeItem("chat-user")
        },
        login(state, action) {
            state.user = action.payload
        },
        setAllUsers(state, action) {
            state.allUsers = action.payload
        }
    }
})

export const { signUp, logout, login, setAllUsers } = authSlice.actions
export default authSlice.reducer