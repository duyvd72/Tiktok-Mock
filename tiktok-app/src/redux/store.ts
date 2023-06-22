import newsFeedSlice from '@/pages/User/NewsFeed/redux/newsFeedSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    newsFeed: newsFeedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
