import ButtonGroup from '@/pages/User/NewsFeed/components/ButtonGroup/ButtonGroup';
import { IVideo } from '@/interfaces/interfaces';
import defaultAva from '@/assets/images/default-ava.png';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setVideoTimestamp } from '../../redux/videoTimeStampSlice';
import { useLocation } from 'react-router-dom';

/* Linh ---------------------------------------------------------------------- starts */
interface IProps {
  video: IVideo;
}
/* Linh ---------------------------------------------------------------------- ends */

const VideoItem = (props: IProps) => {
  const { video } = props;
  const videoRef = useRef<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlayBtn = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeRange = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (video) {
      if (newVolume === 0) {
        video.muted = true;
      } else {
        video.muted = false;
        video.volume = newVolume;
      }
    }
  };

  const handleVolumeBtn = () => {
    const video = videoRef.current;
    if (video) {
      if (volume === 0) {
        video.muted = false;
        setVolume(video.volume);
      } else {
        video.muted = true;
        setVolume(0);
      }
    }
  };

  /* Linh ---------------------------------------------------------------------- starts */
  const [pauseVideo, setPauseVideo] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleNavigate = (videoId: string) => {
    // console.log("Da paused");
    // console.log("videoTimeStamp: ", videoTimeStamp);
    navigate(`/videodetails/${videoId}`);
    setPauseVideo(true);
  };

  const dispatch = useAppDispatch();
  const videoTimeStamp = useAppSelector(
    (state) => state.videoTimeStamp.videoTimestamp
  );

  useEffect(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    let currentTimestamp = 0;
    const startTracking = () => {
      currentTimestamp = Math.round((videoElement?.currentTime ?? 0) * 1000);
      // console.log("currentTimestamp useEffect: ", currentTimestamp);
      dispatch(setVideoTimestamp(currentTimestamp));
    };
    const handleBeforeUnload = () => {
      videoElement?.pause();
      currentTimestamp = Math.round((videoElement?.currentTime ?? 0) * 1000);
      dispatch(setVideoTimestamp(currentTimestamp));
    };
    // if(videoElement) {
    //   videoElement.addEventListener("play", startTracking);
    //   videoElement.addEventListener("loadedmetadata", function() {
    //     this.currentTime = videoTimeStamp;
    //   });
    // };
    if (pauseVideo) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      if (videoElement) {
        videoElement.addEventListener('loadedmetadata', function () {
          this.currentTime = videoTimeStamp;
          // console.log("Da paused trong useEffect: ", videoTimeStamp);
        });
      }
    } else {
      if (videoElement) {
        videoElement.addEventListener('play', startTracking);
        videoElement.addEventListener('loadedmetadata', function () {
          // console.log("Playing trong useEffect: ", videoTimeStamp);
          this.currentTime = videoTimeStamp;
        });
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', startTracking);
        videoElement.removeEventListener('loadedmetadata', function () {
          this.currentTime = videoTimeStamp;
        });
        // window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };
  }, [pauseVideo, videoRef]);
  /* Linh ---------------------------------------------------------------------- ends */

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex gap-4 justify-center">
        <div>
          <img
            className="w-[56px] h-[56px] rounded-full"
            src={video.ownerVideo.avatarUrl || defaultAva}
            alt=""
          />
        </div>
        <div className="w-[50%]">
          <div className="flex items-center gap-2">
            <p className="font-bold">{video.ownerVideo.nickname}</p>
            <p className="text-sm">{video.ownerVideo.fullname}</p>
          </div>
          <div>
            <p>
              {video.videoTitle}
              <strong>{video.videoHastag}</strong>
            </p>
          </div>
          <div className="flex gap-5 mt-3  w-[70%]">
            <div className="relative z-10">
              <div
                className="absolute z-50 w-full bottom-8 opacity-100 
            hover:opacity-100 transition-opacity ease-in-out"
              >
                <div className="flex justify-between w-[85%] mx-auto">
                  <button className="p-2 text-white" onClick={handlePlayBtn}>
                    {!isPlaying ? (
                      <i className="fas fa-play"></i>
                    ) : (
                      <i className="fas fa-pause"></i>
                    )}
                  </button>
                  <div className="group">
                    <div className="text-white relative w-[85%] mx-auto">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step={0.1}
                        value={volume}
                        onChange={handleVolumeRange}
                        className="absolute w-[70px] right-[-17.5px] bottom-8 cursor-pointer
                        rotate-[270deg] accent-slate-200 opacity-0 group-hover:opacity-100"
                      />
                    </div>
                    <button
                      className="p-2 text-white"
                      onClick={handleVolumeBtn}
                    >
                      {volume ? (
                        <i className="fas fa-volume-up"></i>
                      ) : (
                        <i className="fas fa-volume-mute"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <video
                className="min-w-[320px] min-h-[570px] rounded-lg bg-black cursor-pointer"
                ref={videoRef}
                loop={true}
                onClick={() => handleNavigate(video._id)}
              >
                <source src={video.videoUrl} type="video/mp4" />
              </video>
            </div>
            <div className="mt-auto">
              <ButtonGroup handleNavigate={() => handleNavigate(video._id)} />
            </div>
          </div>
        </div>
        <div>
          <button className="border px-1">Đang Follow</button>
        </div>
      </div>
      <hr className="my-5 w-[70%] mx-auto" />
    </div>
  );
};

export default VideoItem;
