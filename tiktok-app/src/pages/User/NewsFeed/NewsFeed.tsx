import ScrollToTop from '@/components/ScrollToTop';
import VideoItem from './components/VideoItem/VideoItem';
import { useEffect } from 'react';
import { getVideoListAPI } from '@/api/userAPIs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const videoList = useAppSelector((state) => state.newsFeed.videoList);
  console.log(videoList);

  useEffect(() => {
    dispatch(getVideoListAPI());
  }, []);

  return (
    <div className="w-full">
      <div className="fixed bottom-10 right-10">
        <ScrollToTop />
      </div>
      {videoList.map((video) => {
        return <VideoItem key={video._id} />;
      })}
    </div>
  );
};

export default NewsFeed;
