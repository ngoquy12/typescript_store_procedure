import { createSlice } from "@reduxjs/toolkit";
import { createUser, searchAndPaging } from "../services/user.service";

const userSlice = createSlice({
  name: "user",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAndPaging.pending, (state) => {
        state.status = "Loading"; // Trạng thái chờ load dữ liệu
      })
      .addCase(searchAndPaging.fulfilled, (state, action) => {
        state.status = "Sucessfully";
        state.data = action.payload; // Đã có dữ liệu
      })
      .addCase(searchAndPaging.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error as any;
      })
      .addCase(createUser.pending, (state) => {
        state.status = "Loading"; // Trạng thái chờ load dữ liệu
      })
      .addCase(createUser.fulfilled, (state: any, action) => {
        state.status = "Sucessfully";
        state.data = state.data.push(action.payload.data); // Đã có dữ liệu
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log("action", action);

        state.status = "Failed";
        state.error = action.error as any;
      });
  },
});

export default userSlice.reducer;
