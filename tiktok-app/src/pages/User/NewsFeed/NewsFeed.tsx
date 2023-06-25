import ScrollToTop from '@/components/ScrollToTop';
import VideoItem from './components/VideoItem/VideoItem';
import { useEffect } from 'react';
import { getVideoListAPI } from '@/api/userAPIs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useLocation } from 'react-router-dom';

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const videoList = useAppSelector((state) => state.newsFeed.videoList);

  /* Linh ---------------------------------------------------------------------- starts */
  const location = useLocation();
  const currentVideoIndex = location.state?.videoIndex || 0;
  /* Linh ---------------------------------------------------------------------- ends */
  
  useEffect(() => {
    dispatch(getVideoListAPI());
  }, []);

  return (
    <div className="w-full">
      <div className="fixed bottom-10 right-10">
        <ScrollToTop />
      </div>
      {/* {videoList.map((video) => {
        return <VideoItem key={video._id} />;
      })} */}

      {/* Linh ---------------------------------------------------------------------- starts */}
      { videoList &&
        videoList.length > 0 &&
        videoList.map((video: any, index: number) => (
          <VideoItem
            key={video._id}
            // videoId={videoList[videoIndex]._id}
            video={video}
            autoplay={index === currentVideoIndex}
            videoIndex={index}
          />
        ))}
        {/* Linh ---------------------------------------------------------------------- ends */}
    </div>
  );
};

export default NewsFeed;
