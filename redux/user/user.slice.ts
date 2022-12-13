import { createSlice } from "@reduxjs/toolkit";

import { getUser, register } from '@/redux/user/user.actions';
import { IUser } from '@/interface/user.types';

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isAuth: false,
  errorMessage: "",
  user: {} as IUser
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      return {
        ...state,
        isError: false,
        isSuccess: false,
        isFetching: false,
      };
    },
  },
  extraReducers: {
    [register.fulfilled]: (
      state: {
        isFetching: boolean;
        isSuccess: boolean;
        user: IUser
      },
      { payload }: any
    ) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload
    },
    [register.pending]: (state: { isFetching: boolean }) => {
      state.isFetching = true;
    },
    [register.rejected]: (state: {
      isFetching: boolean;
      isError: boolean;
    }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [getUser.pending]: (state) => {
      state.isFetching = true;
    },
    [getUser.fulfilled]: (
      state,
      { payload }
    ) => {
      state.isAuth = true
      state.user = payload
    }
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: { user: any }) => state.user;
