import { NavLink } from 'react-router-dom';
import logoIcon from "@/assets/images/logo-icon.png";
import styles from "@/pages/VideoDetails/VideoInfo/VideoInfo.module.css";


const VideoInfo = () => {



    return (
      <>
        {/* Video Info */}
        <div className="col-span-4 flex flex-col pt-5">
          {/* Header */}
          <div className="flex justify-between pl-4">
            {/* Left header*/}
            <div className="flex gap-2 items-center">
              {/* Avatar */}
              <NavLink
                to="/"
                className="bg-[#252525] w-10 h-10 rounded-full line-height flex items-center justify-center"
              >
                <img src={logoIcon} alt="avatar" className="p-2" />
              </NavLink>
              {/* account & username */}
              <div className="leading-5">
                <NavLink to="/" className="">
                  <p className="font-semibold text-md text-[#252525] hover:underline-offset-4">
                    monmen944
                  </p>
                </NavLink>
                <span className="text-sm text-[#252525] mr-2">Chu Tu</span>
                <span className="text-sm text-[#252525]">4d ago</span>
              </div>
            </div>
            {/* Right header*/}
            <button className="border border-customedPink rounded-lg bg-transparent font-semibold text-customedPink px-8 flex-wrap sm:text-sm xs:text-xs">
              Follow
            </button>
          </div>
          {/* description */}
          <div className="flex justify-start items-center gap-1 pl-4 flex-wrap leading-none max-w-full mt-3">
            <span className="text-sm text-[#252525]">Stay balling</span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #monmen944
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #bypass
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #podvify
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #closetotheedge
                </span>
              </NavLink>
            </span>
          </div>
          {/* music */}
          <div className="flex justify-start items-center gap-1 mt-3 pl-4 flex-wrap">
            <span className="text-[#252525] font-light hover:underline-offset-4">
              <i className="fas fa-music text-xs"></i>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #hollaatme
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #boostingstrive
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-[#252525] font-semibold hover:underline-offset-4 text-sm">
                  #toendtherapture
                </span>
              </NavLink>
            </span>
          </div>
          {/* Likes and social platforms */}
          <div className="flex justify-between items-center pl-2 mt-3 mb-3 flex-wrap gap-2">
            {/* Likes */}
            <span className="flex gap-1.5 items-center">
              <span className="flex justify-center items-center bg-[#f1f1f1] w-5 h-5 rounded-full p-4 cursor-pointer">
                <i className="fas fa-heart"></i>
              </span>
              <span className="text-xs font-semibold">216.2k</span>
              <span className="flex justify-center items-center bg-[#f1f1f1] w-5 h-5 rounded-full p-4 cursor-pointer">
                <i className="fas fa-comment-dots"></i>
              </span>
              <span className="text-xs font-semibold">108.6k</span>
              <span className="flex justify-center items-center bg-[#f1f1f1] w-5 h-5 rounded-full p-4 cursor-pointer">
                <i className="fas fa-bookmark"></i>
              </span>
              <span className="text-xs font-semibold">77.5k</span>
            </span>
            {/* Social platforms */}
            <span className="flex gap-2 items-center">
              <span className="flex justify-center items-center bg-[#0075fa] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-facebook text-customedWhite text-sm"></i>
              </span>
              <span className="flex justify-center items-center bg-[#fe2c55] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-reddit text-customedWhite text-sm"></i>
              </span>
              <span className="flex justify-center items-center bg-[#25d366] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-line text-customedWhite text-sm"></i>
              </span>
              <span className="flex justify-center items-center bg-[#1da1f2] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-twitter text-customedWhite text-sm"></i>
              </span>
            </span>
          </div>
          {/* Comment & Reply section */}
          <div className="max-h-[300px] bg-customedGrey text-customedWhite overflow-y-scroll px-4 pt-2">
            <div className="h-[400px]">
              {/* Comment 1 */}
              <div className="border-t border-b border-customedGrey flex justify-between items-center mb-2 flex-wrap">
                {/* Header */}
                <div className="flex flex-col justify-between items-start">
                  {/* Left header */}
                  <div className="flex gap-2 items-center">
                    {/* Avatar */}
                    <NavLink
                      to="/"
                      className="bg-[#252525] w-10 h-10 rounded-full line-height flex items-center justify-center mt-[-10px]"
                    >
                      <img src={logoIcon} alt="avatar" className="p-2" />
                    </NavLink>
                    {/* account & username */}
                    <div className="">
                      <NavLink to="/" className="">
                        <p className="font-semibold text-md text-[#252525] hover:underline-offset-4 mt-3">
                          monmen944
                        </p>
                      </NavLink>
                      <span className="text-sm text-[#252525] mr-5">19/12</span>
                      <div>
                        <span className="text-sm text-[#a19d9d] mr-5">
                          3h ago
                        </span>
                        <button className="text-sm text-[#a19d9d]">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* View more replies */}
                  <div className="flex items-center pl-12 mt-2">
                    <button className="text-sm text-[#252525] hover:underline-offset-4">
                      View more replies{" "}
                      <span className="text-sm text-[#252525]">(5)</span>
                      <i className="fas fa-chevron-down self-center ml-2"></i>
                    </button>
                  </div>
                </div>
                {/* Right header */}
                <div className="flex flex-col justify-end">
                  <button>
                    <i className="far fa-heart text-[#252525]"></i>
                  </button>
                  <p className="text-xs text-[#252525]">3586</p>
                </div>
              </div>
              {/* Comment 2 */}
              <div className="border-t border-b border-customedGrey flex justify-between items-center mb-2 flex-wrap">
                {/* Header */}
                <div className="flex flex-col justify-between items-start">
                  {/* Left header */}
                  <div className="flex gap-2 items-center">
                    {/* Avatar */}
                    <NavLink
                      to="/"
                      className="bg-[#252525] w-10 h-10 rounded-full line-height flex items-center justify-center mt-[-10px]"
                    >
                      <img src={logoIcon} alt="avatar" className="p-2" />
                    </NavLink>
                    {/* account & username */}
                    <div className="">
                      <NavLink to="/" className="">
                        <p className="font-semibold text-md text-[#252525] hover:underline-offset-4 mt-3">
                          monmen944
                        </p>
                      </NavLink>
                      <span className="text-sm text-[#252525] mr-5">19/12</span>
                      <div>
                        <span className="text-sm text-[#a19d9d] mr-5">
                          3h ago
                        </span>
                        <button className="text-sm text-[#a19d9d]">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* View more replies */}
                  <div className="flex items-center pl-12 mt-2">
                    <button className="text-sm text-[#252525] hover:underline-offset-4">
                      View more replies{" "}
                      <span className="text-sm text-[#252525]">(5)</span>
                      <i className="fas fa-chevron-down self-center ml-2"></i>
                    </button>
                  </div>
                </div>
                {/* Right header */}
                <div className="flex flex-col justify-end">
                  <button>
                    <i className="far fa-heart text-[#252525]"></i>
                  </button>
                  <p className="text-xs text-[#252525]">3586</p>
                </div>
              </div>
              {/* Comment 3 */}
              <div className="border-t border-b border-customedGrey flex justify-between items-center mb-2 flex-wrap">
                {/* Header */}
                <div className="flex flex-col justify-between items-start">
                  {/* Left header */}
                  <div className="flex gap-2 items-center">
                    {/* Avatar */}
                    <NavLink
                      to="/"
                      className="bg-[#252525] w-10 h-10 rounded-full line-height flex items-center justify-center mt-[-10px]"
                    >
                      <img src={logoIcon} alt="avatar" className="p-2" />
                    </NavLink>
                    {/* account & username */}
                    <div className="">
                      <NavLink to="/" className="">
                        <p className="font-semibold text-md text-[#252525] hover:underline-offset-4 mt-3">
                          monmen944
                        </p>
                      </NavLink>
                      <span className="text-sm text-[#252525] mr-5">19/12</span>
                      <div>
                        <span className="text-sm text-[#a19d9d] mr-5">
                          3h ago
                        </span>
                        <button className="text-sm text-[#a19d9d]">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* View more replies */}
                  <div className="flex items-center pl-12 mt-2">
                    <button className="text-sm text-[#252525] hover:underline-offset-4">
                      View more replies{" "}
                      <span className="text-sm text-[#252525]">(5)</span>
                      <i className="fas fa-chevron-down self-center ml-2"></i>
                    </button>
                  </div>
                </div>
                {/* Right header */}
                <div className="flex flex-col justify-end">
                  <button>
                    <i className="far fa-heart text-[#252525]"></i>
                  </button>
                  <p className="text-xs text-[#252525]">3586</p>
                </div>
              </div>
            </div>
          </div>
          {/* Comment input */}
          <div className="flex items-center max-h-full max-w-full">
            <div className="py-10 px-7 flex gap-2">
              <input
                type="text"
                className={`px-3 py-3 text-slate-600 bg-customedGrey bg-customedGrey 
                rounded text-sm border-0 shadow outline-none min-w-[300px] ${styles.customedCaretColor}`}
                placeholder="Add comment..."
              />
              <button className="border-none outline-none font-semibold text-customedPink px-2 py-2 text-sm">
                Post
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default VideoInfo;