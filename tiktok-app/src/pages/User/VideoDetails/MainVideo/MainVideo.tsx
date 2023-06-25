import { useNavigate } from "react-router-dom";
import VideoDisplay from "@/pages/User/VideoDetails/components/VideoDisplay";

const MainVideo = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };




  return (
    <>
      {/* Main video */}
      <div className="col-span-8 bg-[#161823] flex justify-between">
        {/* Left component */}
        <div className="col-span-2 flex flex-col items-center">
          {/* close mark */}
          <div className="self-start w-5 h-5 rounded-full bg-stone-700 hover:bg-[#545353] hover:ease-in-out transition duration-300 flex justify-center items-center ml-4 mt-4 p-4 cursor-pointer">
            <button onClick={goBack} className="">
              <i className="fas fa-times text-white"></i>
            </button>
          </div>
          {/* Arrow left*/}
          <div className="flex flex-col flex-grow justify-center items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-[#252525]">
              <i className="fas fa-chevron-left text-white ml-2"></i>
            </button>
          </div>
        </div>
        {/* Video */}
        <VideoDisplay 
          
        />
        {/* <div className="col-span-4 max-w-[500px] max-h-screen text-white overflow-hidden autoplay">
          <video
            className="h-full w-full"
            src={videoUrl}
            loop={true}
            autoPlay={true}
            controls={true}
            muted={true}
          />
        </div> */}
        {/* Right component */}
        <div className="col-span-2 flex flex-col items-center">
          <div className="self-start mt-2 mr-4">
            <button className="rounded-xl bg-stone-700 hover:bg-[#545353] hover:ease-in-out transition duration-300 text-white text-sm flex gap-2 items-center py-2 px-3 mt-1">
              <i className="fas fa-flag "></i>
              Report
            </button>
          </div>
          {/* Arrow right*/}
          <div className="flex flex-col flex-grow justify-center items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-[#252525]">
              <i className="fas fa-chevron-right text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainVideo;
