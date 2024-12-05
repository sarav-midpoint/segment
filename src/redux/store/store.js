import { configureStore } from "@reduxjs/toolkit";
import segmentReducer from "../slice/segmentSlice";

const store = configureStore({
  reducer: segmentReducer,
});

export default store;
