import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  videoTimestamp: number;
}

const initialState: VideoState = {
  videoTimestamp: 0,
};

const videoTimeStampSlice = createSlice({
  name: "videoTimeStamp",
  initialState,
  reducers: {
    setVideoTimestamp: (state, action: PayloadAction<number>) => {
        state.videoTimestamp = action.payload;
    },
  },
});

export const { setVideoTimestamp } = videoTimeStampSlice.actions;
export const videoTimeStampReducer = videoTimeStampSlice.reducer;
