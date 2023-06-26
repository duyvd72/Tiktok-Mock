import {
  ICurrentUser,
  ILoggingUser,
  IVideo,
  ISignUpUser,
  IUploadingVideo,
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
      if (response.data.message == 'invalid username' || response.data.message == 'invalid password') {
        return response.data
      }

      setAccessToken(response.data.data.token);

      return response.data.data;
    } catch (error) {
      throw new Error('Login Failed');
    }
  }
);

export const signUpUserAPI = createAsyncThunk(
  'user/signUp',
  async (signUpUser: ISignUpUser): Promise<{ status: string }> => {
    try {
      const response = await axiosInstance.post(
        'accounts/register',
        signUpUser
      );

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
