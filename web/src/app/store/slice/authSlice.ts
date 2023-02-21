import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isAuthenticated: boolean;
  user: any;
};

const initialState: InitialState = {
  isAuthenticated: true,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      const { user_info: user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
    loggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loggedIn } = authSlice.actions;

export default authSlice.reducer;
