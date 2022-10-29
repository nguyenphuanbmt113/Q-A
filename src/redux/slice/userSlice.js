import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "account",
  initialState: {
    access_token: "",
    email: "",
    image: "",
    refresh_token: "",
    role: "",
    username: "",
    isAuthention: false,
  },
  reducers: {
    getUser: (state, action) => {
      state.access_token = action.payload?.access_token;
      state.email = action.payload?.email;
      state.image = action.payload?.image;
      state.refresh_token = action.payload?.refresh_token;
      state.role = action.payload?.role;
      state.username = action.payload?.username;
      state.isAuthention = true;
    },
    dologout: (state) => {
      state.access_token = "";
      state.email = "";
      state.image = "";
      state.refresh_token = "";
      state.role = "";
      state.username = "";
      state.isAuthention = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser, dologout } = userReducer.actions;

export default userReducer.reducer;
