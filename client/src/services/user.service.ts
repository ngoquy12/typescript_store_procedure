import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios";

export const searchAndPaging = createAsyncThunk(
  "user/searchAndPaging",
  async (user: any) => {
    const response = await instance.get(
      `users?keysearch=${user.keySearch}&pagenumber=${user.currentPage}&pagesize=${user.pageSize}`
    );

    return response.data.data;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await instance.post("users", user);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
