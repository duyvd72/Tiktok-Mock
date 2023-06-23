import {
  ICurrentUser,
  ILoggingUser,
  IUploadingVideo,
  IVideo,
} from '@/interfaces/interfaces';
import axiosInstance from '@/libs/axios/axiosConfig';
import { setAccessToken } from '@/utils/accessTokenLS';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getVideoListAPI = createAsyncThunk(
  'videoList/fetchVideoList',
  async (): Promise<IVideo[]> => {
    try {
      const response = await axiosInstance.get('videos/getAllVideo');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get video list!');
    }
  }
);

export const loginUserAPI = createAsyncThunk(
  'user/login',
  async (loggingUser: ILoggingUser): Promise<ICurrentUser> => {
    try {
      const response = await axiosInstance.post('accounts/login', loggingUser);
      console.log(response.data);

      setAccessToken(response.data.token);

      return response.data;
    } catch (error) {
      throw new Error('Login Failed');
    }
  }
);

export const uploadVideoAPI = async (
  uploadingVideo: IUploadingVideo
): Promise<IVideo> => {
  try {
    const response = await axiosInstance.post('videos/upload', uploadingVideo);
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload video!');
  }
};
