import { createSlice } from "@reduxjs/toolkit";
import { globalConstants } from "app/constants/constant";

type InitialState = {
  mode: "dark" | "light" | string;
  logoPath: string;
};

const initialState: InitialState = {
  mode: globalConstants.defaultTheme,
  logoPath: globalConstants.logoLight,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.logoPath =
        state.mode === "light"
          ? globalConstants.logoLight
          : globalConstants.logoDark;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
