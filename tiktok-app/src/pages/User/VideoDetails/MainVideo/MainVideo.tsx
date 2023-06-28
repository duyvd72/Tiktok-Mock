import { useNavigate } from 'react-router-dom';
import VideoDisplay from '@/pages/User/VideoDetails/components/VideoDisplay';
// import IVideo from "@/interfaces/interfaces";
import { useEffect, useRef, useState } from 'react';
import { IMyVideoInfo } from '@/api/VideoDetails/apiSlice';
// interface ICommentCreateAt {
//   createdAt: string;
// }

// interface IMyVideoList {
//   _id: string;
//   like: [];
//   comment: ICommentCreateAt[];
//   ownerVideo: string;
//   updatedAt: string;
//   videoHastag: string;
//   videoTitle: string;
//   videoUrl: string;
//   __v: number;
// }

interface IMyMainVideoProps {
  myVideoListArr: IMyVideoInfo[] | undefined;
  currentVideoId: string | undefined;
}

const MainVideo = (props: IMyMainVideoProps) => {
  const { myVideoListArr, currentVideoId } = props;

  const navigate = useNavigate();
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseBtn = () => {
    navigate('/');
  };

  useEffect(() => {
    const prevButtonEl = prevButtonRef.current;
    const nextButtonEl = nextButtonRef.current;

    if (prevButtonEl) {
      if (videoIndex === 0) {
        prevButtonEl.style.display = 'none';
      } else {
        prevButtonEl.style.display = 'block';
      }
    }
    if (nextButtonEl && myVideoListArr) {
      if (videoIndex === myVideoListArr.length - 1) {
        nextButtonEl.style.display = 'none';
      } else {
        nextButtonEl.style.display = 'block';
      }
    }
    return () => {
      if (prevButtonEl) {
        prevButtonEl.style.display = '';
      }
      if (nextButtonEl) {
        nextButtonEl.style.display = '';
      }
    };
  }, [videoIndex, myVideoListArr]);

  useEffect(() => {
    // find current video index
    if (myVideoListArr && currentVideoId) {
      const selectedIndex = myVideoListArr.findIndex(
        (video) => video._id === currentVideoId
      );
      if (selectedIndex !== -1) {
        setVideoIndex(selectedIndex);
      }
    }
  }, [myVideoListArr, currentVideoId]);

  const nextVideoClick = () => {
    if (myVideoListArr && videoIndex < myVideoListArr.length - 1) {
      setVideoIndex(videoIndex + 1);
      const nextVideoId = myVideoListArr[videoIndex + 1]._id;
      navigate(`/videodetails/${nextVideoId}`);
    }
  };

  const prevVideoClick = () => {
    if (myVideoListArr && videoIndex > 0) {
      setVideoIndex(videoIndex - 1);
      const nextVideoId = myVideoListArr[videoIndex - 1]._id;
      navigate(`/videodetails/${nextVideoId}`);
    }
  };

  return (
    <>
      {/* Main video */}
      <div className="col-span-8 bg-[#161823] flex justify-between">
        {/* Left component */}
        <div className="col-span-2 flex flex-col items-center">
          {/* close mark */}
          <div className="self-start w-5 h-5 rounded-full bg-stone-700 hover:bg-[#545353] hover:ease-in-out transition duration-300 flex justify-center items-center ml-4 mt-4 p-4 cursor-pointer">
            <button onClick={handleCloseBtn} className="">
              <i className="fas fa-times text-white"></i>
            </button>
          </div>
          {/* Arrow left*/}
          <div className="flex flex-col flex-grow justify-center items-center gap-3">
            <button
              className="w-10 h-10 rounded-full bg-[#252525] flex justify-center items-center"
              onClick={prevVideoClick}
              ref={prevButtonRef}
            >
              <i className="fas fa-chevron-left text-white ml-2"></i>
            </button>
          </div>
        </div>

        <div className="col-span-4 max-w-[500px] max-h-screen text-white overflow-hidden autoplay">
          {/* Video */}
          {myVideoListArr && myVideoListArr.length > 0 && (
            <VideoDisplay
              key={myVideoListArr[videoIndex]._id}
              videoUrl={myVideoListArr[videoIndex].videoUrl}
            />
          )}
        </div>
        {/* Right component */}
        <div className="col-span-2 flex flex-col items-center">
          {/* <div className="self-start mt-2 mr-4">
            <button className="rounded-xl bg-stone-700 hover:bg-[#545353] hover:ease-in-out transition duration-300 text-white text-sm flex gap-2 items-center py-2 px-3 mt-1">
              <i className="fas fa-flag "></i>
              Report
            </button>
          </div> */}
          {/* Arrow right*/}
          <div className="flex flex-col flex-grow justify-center items-center gap-3">
            <button
              className="w-10 h-10 rounded-full bg-[#252525] flex justify-center items-center"
              onClick={nextVideoClick}
              ref={nextButtonRef}
            >
              <i className="fas fa-chevron-right text-white items-center"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainVideo;
