import { defaultService } from "./../../api/services/defaultService";
import { IDefault } from "../../models/default";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IDefault[] = [];

const defaultSlice = createSlice({
  name: "default",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      defaultService.endpoints.getPosts.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
  },
});

export default defaultSlice.reducer;
