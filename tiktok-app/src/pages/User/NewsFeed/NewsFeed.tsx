import ScrollToTop from '@/components/ScrollToTop';
import VideoItem from './components/VideoItem/VideoItem';
import { useEffect, useMemo } from 'react';
import { getVideoListAPI } from '@/api/userAPIs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IVideo } from '@/interfaces/interfaces';
import { shuffleVideo } from '@/utils/shuffleVideo';
import { useLocation } from 'react-router';

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const videoList = useAppSelector((state) => state.newsFeed.videoList);

  const location = useLocation();

  // videoList = useMemo(() => shuffleVideo(videoList), []);

  useEffect(() => {
    dispatch(getVideoListAPI());
  }, []);

  return (
    <div className="w-full">
      <div className="fixed bottom-10 right-10">
        <ScrollToTop />
      </div>
      {videoList &&
        videoList.length > 0 &&
        videoList.map((video: IVideo) => (
          <VideoItem key={video._id} video={video} />
        ))}
    </div>
  );
};

export default NewsFeed;
