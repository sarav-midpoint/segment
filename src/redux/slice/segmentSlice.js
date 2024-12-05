import { createSlice } from "@reduxjs/toolkit";

const segmentSlice = createSlice({
  name: "segment",
  initialState: [],
  reducers: {
    addSegment: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export const { addSegment } = segmentSlice.actions;
export default segmentSlice.reducer;
