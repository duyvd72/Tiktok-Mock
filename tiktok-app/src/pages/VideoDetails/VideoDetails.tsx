import MainVideo from './MainVideo/MainVideo';
import VideoInfo from './VideoInfo/VideoInfo';
const VideoDetails = () => {


  
    return(
        <div className="grid grid-cols-12 p-0 m-0 absolute">
          {/* Main Video */}
          <MainVideo />
          {/* Video Info */}
          <VideoInfo />
        </div>
    );
};

export default VideoDetails;