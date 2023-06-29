import { getVideoListAPI } from '@/api/userAPIs';
import { IVideo } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface IVideoListState {
  loading: boolean;
  videoList: IVideo[];
  totalPage: number
}

const initialState: IVideoListState = {
  loading: false,
  videoList: [],
  totalPage: 0
};

const newsFeedSlice = createSlice({
  name: 'newsFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideoListAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideoListAPI.fulfilled, (state, action) => {
        state.videoList = [...state.videoList, ...action.payload.video];
        state.totalPage = action.payload.totalPage
        state.loading = false;
      });
  },
});

export default newsFeedSlice;
