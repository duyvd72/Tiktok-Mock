import ButtonGroup from '@/pages/User/NewsFeed/components/ButtonGroup/ButtonGroup';
import { IVideo } from '@/interfaces/interfaces';
import defaultAva from '@/assets/images/default-ava.png';
import { useRef, useState } from 'react';

interface IProps {
  video: IVideo;
}

const VideoItem = (props: IProps) => {
  const { video } = props;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlayBtn = () => {
    const video: any = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeBtn = () => {
    const video: any = videoRef.current;
    if (video.volume === 0) {
      video.volume = 1;
      setVolume(1);
      setVolume(1);
    } else {
      video.volume = 0;
      setVolume(0);
    }
  };

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
            <div className="relative">
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

                  <button className="p-2 text-white" onClick={handleVolumeBtn}>
                    {volume ? (
                      <i className="fas fa-volume-up"></i>
                    ) : (
                      <i className="fas fa-volume-mute"></i>
                    )}
                  </button>
                </div>
              </div>
              <video
                className="min-w-[320px] min-h-[570px] rounded-lg bg-black"
                ref={videoRef}
                loop
              >
                <source src={video.videoUrl} type="video/mp4" />
              </video>
            </div>
            <div className="mt-auto">
              <ButtonGroup />
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
