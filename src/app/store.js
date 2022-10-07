import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/imageSlice";

export default configureStore({
  reducer: {
    images: imageReducer,
  },
});
