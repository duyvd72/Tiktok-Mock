import MainVideo from './MainVideo/MainVideo';
import VideoInfo from './VideoInfo/VideoInfo';

const VideoDetails = () => {

    return(
        <div className="grid grid-cols-12 fixed inset-0 max-w-screen max-h-screen z-50 top-0 left-0 overflow-auto">
          {/* Main Video */}
          <MainVideo />
          {/* Video Info */}
          <VideoInfo />
        </div>
    );
};

export default VideoDetails;