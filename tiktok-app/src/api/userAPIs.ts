import { IVideo } from '@/interfaces/interfaces';
import axiosInstance from '@/libs/axios/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getVideoListAPI = createAsyncThunk(
  'videoList/fetchVideoList',
  async (): Promise<IVideo[]> => {
    const response = await axiosInstance.get('videos/getAllVideo');
    return response.data;
  }
);
