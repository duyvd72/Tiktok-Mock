import newsFeedSlice from '@/pages/User/NewsFeed/redux/newsFeedSlice';
import authenticationSlice from '@/pages/User/Authentication/redux/authenticationSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    newsFeed: newsFeedSlice.reducer,
    authentication: authenticationSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
