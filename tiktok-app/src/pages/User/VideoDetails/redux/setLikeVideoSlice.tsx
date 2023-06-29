import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IVideoByIdInfo } from "@/api/VideoDetails/apiSlice";
import { VideoDetailsApi } from "@/api/VideoDetails/apiSlice";
import { union } from "lodash";

interface VideoDetailState {
  videoDetail: IVideoByIdInfo | null;
};

const setLikeVideoSlice = createSlice({
  name: "videoDetail",
  initialState: {
    videoDetail: null,
  } as VideoDetailState,
  reducers: {
    setVideoLikedUsers: (state, action: PayloadAction<string>) => {
      if (!state.videoDetail) return;
      if (state.videoDetail.like.includes(action.payload)) {
        state.videoDetail.like = state.videoDetail.like.filter(
          (item) => item !== action.payload
        );
      } else {
        state.videoDetail.like.push(action.payload);
      }
    },
    
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      VideoDetailsApi.endpoints.getVideoByVideoId.matchFulfilled,
      (state, action) => {
        state.videoDetail = action.payload;
      }
    );
  },
});

export const selectVideoDetail = (state: any) => state.videoDetail.videoDetail;
export const selectLikedUsers = (state: any) =>
  union(state.videoDetail.videoDetail?.like) || [];
export const { setVideoLikedUsers } = setLikeVideoSlice.actions;
export default setLikeVideoSlice;
