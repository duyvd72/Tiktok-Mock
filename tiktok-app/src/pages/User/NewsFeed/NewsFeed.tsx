import ScrollToTop from '@/components/ScrollToTop';
import VideoItem from './components/VideoItem/VideoItem';

const NewsFeed = () => {
  return (
    <div className="w-full">
      <div className="fixed bottom-10 right-10">
        <ScrollToTop />
      </div>
      <VideoItem />
      <VideoItem />
      <VideoItem />
    </div>
  );
};

export default NewsFeed;
