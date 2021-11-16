import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IConfigState {
  baseUrl: string;
  defaultSetting: any;
}

const initialState: IConfigState = {
  baseUrl: "",
  defaultSetting: null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<IConfigState>) => {
      const { baseUrl: baseURL, defaultSetting } = action.payload;
      state.baseUrl = baseURL;
      state.defaultSetting = defaultSetting;
    },
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
