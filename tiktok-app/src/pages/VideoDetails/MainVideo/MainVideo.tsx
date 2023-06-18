import { NavLink } from "react-router-dom";

const MainVideo = () => {


    
    return(
        <>
          {/* Main video */}
          <div className="col-span-8 bg-backgroundFadedIn flex justify-between">
            {/* Left component */}
            <div className="col-span-2 flex flex-col items-center">
              {/* close mark */}
              <div className="self-start w-5 h-5 rounded-full bg-[#545353] flex justify-center items-center ml-4 mt-4 p-4 cursor-pointer">
                <NavLink to="/" className="">
                  <i className="fas fa-times text-customedWhite"></i>
                </NavLink>
              </div>
              {/* Arrow left*/}
              <div className="flex flex-col flex-grow justify-center items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-[#252525]">
                  <i className="fas fa-chevron-left text-customedWhite ml-2"></i>
                </button>
              </div>
            </div>
            {/* Video */}
            <div className="col-span-4 max-w-[500px] text-customedWhite">
              <video
                className="h-full w-full"
                src="https://www.youtube.com/watch?v=Z5NoQg8LdDk"
                loop={true}
                autoPlay={true}
                controls={true}
              />
            </div>
            {/* Right component */}
            <div className="col-span-2 flex flex-col items-center">
              <div className="self-start mt-2 mr-4">
                <button className="rounded-xl bg-[#545353] text-customedWhite text-sm flex gap-2 items-center py-2 px-3 mt-1">
                  <i className="fas fa-flag "></i>
                  Report
                </button>
              </div>
              {/* Arrow right*/}
              <div className="flex flex-col flex-grow justify-center items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-[#252525]">
                  <i className="fas fa-chevron-right text-customedWhite"></i>
                </button>
              </div>
            </div>
          </div>
        </>
    );
};

export default MainVideo;