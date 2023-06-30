import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface IOwnerVideo {
  _id: string;
  nickname: string;
  fullname: string;
}

interface IVideoListItem {
  _id: string;
  comment: [];
  createdAt: string;
  like: [];
  ownerVideo: IOwnerVideo;
  updatedAt: string;
  videoHashtag: string;
  videoTitle: string;
  videoUrl: string;
  __v: number;
}

interface IVideoliked {
  isVideoliked?: boolean;
}

const UserDetailVideos = ({ isVideoliked }: IVideoliked) => {
  const [videoUrlList, setVideoUrlList] = useState<[]>([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  console.log("isVideoliked", isVideoliked);

  if (isVideoliked) {
    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/accounts/searchuser/${userId}`
        )
        .then((response) => {
          setVideoUrlList(response.data.videoliked);
        })
        .catch((err) => console.error(err));
    }, [isVideoliked]);
  } else {
    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/accounts/searchuser/${userId}`
        )
        .then((response) => {
          setVideoUrlList(response.data.myVideo);
        })
        .catch((err) => console.error(err));
    }, [isVideoliked]);
  }

  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    video.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  };

  const handleNavigate = (videoId: string) => {
    navigate(`/videodetails/${videoId}`);
  };

  return (
    <div className="grid grid-cols-6 gap-4 mt-2 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      {videoUrlList.map((item: IVideoListItem) => {
        return (
          <div key={item._id}>
            <div className="relative">
              <div
                className="grid rounded-md bg-neutral-950 content-center"
                style={{ width: "fit-content" }}
              >
                <video
                  className="w-full rounded-md cursor-pointer"
                  // style={{ height: "340px", minWidth: "191px" }}
                  onMouseOver={handleOnMouseOver}
                  onMouseOut={handleOnMouseOut}
                  muted
                  onClick={() => handleNavigate(item._id)}
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
          </div>
        );
      })}
    </div>
  );
};

export default UserDetailVideos;
