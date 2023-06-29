import { ICurrentUser } from '@/interfaces/interfaces';
import axiosInstance from '@/libs/axios/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserListAPI = createAsyncThunk(
  'userList/fetchUserList',
  async (): Promise<ICurrentUser[]> => {
    try {
      const response = await axiosInstance.get('accounts/searchuser/all');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get user list!');
    }
  }
);

export const getUserByIdAPI = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string): Promise<ICurrentUser> => {
    try {
      console.log('id', userId);
      const response = await axiosInstance.get(`accounts/searchuser/${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get user!');
    }
  }
);
