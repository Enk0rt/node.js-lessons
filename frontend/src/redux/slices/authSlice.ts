import { AsyncThunk, createAsyncThunk, createSlice, GetThunkAPI, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { IAuth } from "../../interfaces/IAuth";
import { authService } from "../../services/authService";
import { use } from "react";

interface IState {
    me: IUser | null,
    error: boolean
}

const initialState: IState = {
    me: null,
    error: false,
};

const login = createAsyncThunk<IUser, { user: IAuth }>(
    "authSlice/login",
    async ({ user }, { rejectWithValue }  ) => {
        try {
            return await authService.login(user)
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action)=> {
                state.me = action.payload
            })
            .addMatcher(isRejected(login),state => {
                state.error = true
            })
            .addMatcher(isFulfilled(login),state => {
                state.error = false
            })
});

const {reducer:authReducer,actions} = authSlice

const authActions = {
    ...actions,
    login
}

export {
    authReducer,authActions
}