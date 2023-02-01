import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsers: (state, { payload }) => {
            const updatedPayload = payload.map(item => {
                return { ...item, isChecked: false }
            })
            state.users = updatedPayload
        },
        deleteUser: (state, { payload }) => {
            state.users = payload;
        },
        selectUser: (state, { payload }) => {
            state.users = payload;
        },
        deleteSelectedUsers: (state, {payload}) => {
            state.users = payload;
        },
        selectAllUsers: (state, {payload}) => {
            state.users = payload;
        },
        editUser: (state, {payload}) => {
            state.users = payload;
        }
    },
});

export const { getUsers, deleteUser, selectUser, deleteSelectedUsers, selectAllUsers, editUser} = userSlice.actions;
export const getAllUsers = (state) => state.users.users;

export default userSlice.reducer;
