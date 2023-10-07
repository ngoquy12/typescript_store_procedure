import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios";

export const searchAndPaging = createAsyncThunk(
  "user/searchAndPaging",
  async () => {
    const response = await instance.get(
      `users?keysearch&pagenumber=2&pagesize=10`
    );

    return response.data.data;
  }
);
