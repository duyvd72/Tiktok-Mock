import axios from 'axios';
import { useState, useEffect } from 'react';

const UserDetailVideos = () => {
  const [videoUrlList, setVideoUrlList] = useState<[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/videos/getAllVideo`)
      .then((response) => {
        setVideoUrlList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    video.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="grid grid-cols-6 gap-4 mt-2">
      {videoUrlList.map((item, id) => {
        return (
          <div key={id}>
            <div className="relative">
              <div
                className="grid rounded-md bg-neutral-950 content-center"
                style={{ width: 'fit-content' }}
              >
                <video
                  className="w-full rounded-md"
                  style={{ height: '340px', minWidth: '191px' }}
                  onMouseOver={handleOnMouseOver}
                  onMouseOut={handleOnMouseOut}
                  muted
                >
                  <source
                    src={(item as { videoUrl: string }).videoUrl}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute bottom-3 left-3">
                <svg
                  className="inline mr-1"
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path>
                </svg>
                <strong className="text-white">56.5K</strong>
              </div>
            </div>
            <div className="pt-2 px-2">
              <p>ABC</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserDetailVideos;
