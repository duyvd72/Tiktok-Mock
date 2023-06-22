import { getVideoListAPI } from '@/api/userAPIs';
import { IVideo } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface IVideoListState {
  loading: boolean;
  videoList: IVideo[];
}

const initialState: IVideoListState = {
  loading: false,
  videoList: [],
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
        state.videoList = action.payload;
        state.loading = false;
      });
  },
});

// {
//   [getVideoListAPI.pending]:(state) => {
//     state.loading = true
//   },
//   [getVideoListAPI.fulfilled]:(state,action) => {
//     state.videoList = action.payload;
//           state.loading = false
//   },
// }
export default newsFeedSlice;
