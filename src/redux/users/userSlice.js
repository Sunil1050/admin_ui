import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncUsers = createAsyncThunk(
    "users/fetchAsyncUsers",
    async () => {
        const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        return response.data;
    }
);

const initialState = {
    users: [],
    searchTerm: "",
    currentPage: 1,
    isChecked: false
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        searchUsers: (state, { payload }) => {
            state.searchTerm = payload
        },
        deleteUser: (state, { payload }) => {
            state.users = payload;
        },
        selectUser: (state, { payload }) => {
            state.users = payload;
        },
        deleteSelectedUsers: (state, { payload }) => {
            state.users = payload;
        },
        selectAllUsers: (state, { payload }) => {
            state.users = payload;
        },
        editUser: (state, { payload }) => {
            state.users = payload;
        },
        changePage: (state, { payload }) => {
            state.currentPage = payload
        }
    },
    extraReducers: {
        [fetchAsyncUsers.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            const updatedPayload = payload.map(item => {
                return { ...item, isChecked: false }
            })
            return { ...state, users: updatedPayload };
        },
        [fetchAsyncUsers.rejected]: () => {
            console.log("Rejected!");
        }
    }
});

export const { getUsers, deleteUser, selectUser, deleteSelectedUsers, selectAllUsers, editUser, searchUsers, changePage } = userSlice.actions;
export default userSlice.reducer;
