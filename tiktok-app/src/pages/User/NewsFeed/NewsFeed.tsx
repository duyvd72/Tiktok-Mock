import ScrollToTop from '@/components/ScrollToTop';
import VideoItem from './components/VideoItem/VideoItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getVideoListAPI } from '@/api/userAPIs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IVideo } from '@/interfaces/interfaces';
import LoadingSpinner from '@/components/LoadingSpinner';
import useModal from '@/hooks/useModal';
import { shuffleVideo } from '@/utils/shuffleVideo';

let count = 0
const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const videoList = useAppSelector((state) => state.newsFeed.videoList);
  const isLoading = useAppSelector((state) => state.newsFeed.loading);
  const totalPage = useAppSelector((state) => state.newsFeed.totalPage);
  const lastVideoElement = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [maxLoad, setMaxLoad] = useState(false)
  const [limit] = useState(3)
  // videoList = useMemo(() => shuffleVideo(videoList), []);

  useEffect(() => {
    dispatch(getVideoListAPI({ page, limit }));
  }, [page]);

  useEffect(() => {
    if (lastVideoElement.current) {
      const callback: IntersectionObserverCallback = (entries) => {
        if (entries[0].isIntersecting) {
          if (page + 1 < totalPage) {
            if (!maxLoad) {
              setPage((prev) => prev + 1);
            }
          } else if (page + 1 >= totalPage) {
            setMaxLoad(true);
          }
        }
      };

      const observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      });

      observer.observe(lastVideoElement.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [videoList.length, maxLoad]);

  return (
    <div className="w-full">
      <div className="fixed bottom-10 right-10">
        <ScrollToTop />
      </div>
      {videoList &&
        videoList.length > 0 &&
        videoList.map((video: IVideo, index) => (
          <div key={index} ref={lastVideoElement}>
            <VideoItem key={video._id} video={video} />
          </div>
        ))}
      <p className='flex justify-center'>
        {isLoading && <LoadingSpinner />}
      </p>
    </div>
  );
};

export default NewsFeed;
