import ScrollToTop from '@/components/ScrollToTop';
import VideoItem from './components/VideoItem/VideoItem';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/libs/axios/axiosConfig';
import { IVideo } from '@/interfaces/interfaces';
import LoadingSpinner from '@/components/LoadingSpinner';

const NewsFeed = () => {
  const [limit] = useState(3)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [maxLoad, setMaxLoad] = useState(false)
  const [videoList, setVideoList] = useState<IVideo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const lastVideoElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(`videos/getAllVideo/?page=${page}&limit=${limit}`);
        setIsLoading(false)
        setVideoList(prev => [...prev, ...response.data.video])
        setTotalPage(response.data.totalPage)
      } catch (error) {
        setIsLoading(false)
        throw new Error('Failed to get video list!');
      }
    })()
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
