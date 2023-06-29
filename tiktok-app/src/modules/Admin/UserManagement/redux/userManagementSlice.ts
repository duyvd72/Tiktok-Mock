import { getUserByIdAPI, getUserListAPI } from '@/api/adminAPIs';
import { ICurrentUser } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface IUserListState {
  loading: boolean;
  userList: ICurrentUser[];
  viewingUserInDetail: ICurrentUser | undefined;
}

const initialState: IUserListState = {
  loading: false,
  userList: [],
  viewingUserInDetail: undefined,
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserListAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserListAPI.fulfilled, (state, action) => {
        state.userList = [];
        state.userList = [...state.userList, ...action.payload];
        state.loading = false;
      })
      .addCase(getUserByIdAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserByIdAPI.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.viewingUserInDetail = action.payload;
        state.loading = false;
      });
  },
});

export default userManagementSlice;
