import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlice";
export default configureStore({
  reducer: {
    account: userReducer,
  },
});
