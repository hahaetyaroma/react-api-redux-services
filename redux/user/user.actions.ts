import { createAsyncThunk } from "@reduxjs/toolkit";

import { AuthService } from "../../services/auth.service";
import { IUserRegister } from "@/interface/user.types";

export const register: any = createAsyncThunk(
  "user/register",
  async (data: IUserRegister, thunkAPI) => {
    try {
      return await AuthService.register(data);
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const login: any = createAsyncThunk(
  "user/login",
  async (data: IUserRegister, thunkAPI) => {
    try {
      return await AuthService.login(data);
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getUser: any = createAsyncThunk(
  "user/getUser",
  async ({}, thunkAPI) => {
    try {
      return await AuthService.getUser();
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
