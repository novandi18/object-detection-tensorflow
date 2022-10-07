import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "images",
  initialState: {
    image: null,
  },
  reducers: {
    setImageSrc: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setImageSrc } = imageSlice.actions;
export default imageSlice.reducer;
