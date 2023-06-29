import newsFeedSlice from '@/pages/User/NewsFeed/redux/newsFeedSlice';
import authenticationSlice from '@/pages/User/Authentication/redux/authenticationSlice';
import { configureStore } from '@reduxjs/toolkit';
import { VideoDetailsApi } from '@/api/VideoDetails/apiSlice';
import { videoTimeStampReducer } from '@/pages/User/NewsFeed/redux/videoTimeStampSlice';
import userManagementSlice from '@/pages/Admin/UserManagement/redux/userManagementSlice';

export const store = configureStore({
  reducer: {
    // Other slices
    newsFeed: newsFeedSlice.reducer,
    authentication: authenticationSlice.reducer,
    videoTimeStamp: videoTimeStampReducer,
    userManagement: userManagementSlice.reducer,

    //----------------------Linh starts------------------------------------------------
    // Video details slice using RTK query
    [VideoDetailsApi.reducerPath]: VideoDetailsApi.reducer,

    //----------------------Linh ends------------------------------------------------
  },
  //----------------------Linh starts------------------------------------------------
  // Add middlewares for RTK query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(VideoDetailsApi.middleware),

  //----------------------Linh ends------------------------------------------------

  //----------------------Linh ends------------------------------------------------
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
