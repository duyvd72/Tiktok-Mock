import { NavLink } from 'react-router-dom';
import logoIcon from "@/assets/images/logo-icon.png";
import useModal from '@/hooks/useModal';
import CommentSection from '../components/CommentSection';



const VideoInfo = () => {
  const { setModalIsOpen } = useModal();
  const onSignIn = () => {
    setModalIsOpen(true);
  };
  


    return (
      <>
        {/* Video Info */}
        <div className="col-span-4 flex flex-col pt-5 bg-white">
          {/* Header */}
          <div className="flex justify-between px-4">
            {/* Left header*/}
            <div className="flex gap-2 items-center">
              {/* Avatar */}
              <NavLink
                to="/userId"
                className="bg-black w-10 h-10 rounded-full line-height flex items-center justify-center"
              >
                <img src={logoIcon} alt="avatar" className="p-2" />
              </NavLink>
              {/* account & username */}
              <div className="leading-5">
                <NavLink to="/userId" className="">
                  <p className="font-semibold text-md text-black hover:underline ">
                    monmen944
                  </p>
                </NavLink>
                <span className="text-sm text-black mr-2">Chu Tu</span>
                <span className="text-sm text-black">4d ago</span>
              </div>
            </div>
            {/* Right header*/}
            <button
              className="border border-customedPink hover:bg-[#fe2c550f] hover:ease-in-out transition duration-300 rounded-lg bg-transparent font-semibold text-customedPink px-8 flex-wrap sm:text-sm xs:text-xs"
              onClick={() => onSignIn()}
            >
              Follow
            </button>
          </div>
          {/* description */}
          <div className="flex justify-start items-center gap-1 pl-4 flex-wrap leading-none max-w-full mt-3">
            <span className="text-sm text-black">Stay balling</span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #monmen944
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #bypass
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #podvify
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #closetotheedge
                </span>
              </NavLink>
            </span>
          </div>
          {/* music */}
          <div className="flex justify-start items-center gap-1 mt-3 pl-4 flex-wrap">
            <span className="text-black font-light hover:underline">
              <i className="fas fa-music text-xs"></i>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #hollaatme
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #boostingstrive
                </span>
              </NavLink>
            </span>
            <span>
              <NavLink to="/">
                <span className="text-black font-semibold hover:underline text-sm">
                  #toendtherapture
                </span>
              </NavLink>
            </span>
          </div>
          {/* Likes and social platforms */}
          <div className="flex justify-between items-center px-2 mt-3 mb-3 flex-wrap gap-2 max-w-full">
            {/* Likes */}
            <span className="flex gap-1.5 items-center">
              <button className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 cursor-pointer" onClick={() => onSignIn()}>
                <i className="fas fa-heart"></i>
              </button>
              <span className="text-xs font-semibold">216.2k</span>
              <span className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 disabled">
                <i className="fas fa-comment-dots"></i>
              </span>
              <span className="text-xs font-semibold">108.6k</span>
              <button className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 cursor-pointer" onClick={() => onSignIn()}>
                <i className="fas fa-bookmark"></i>
              </button>
              <span className="text-xs font-semibold">77.5k</span>
            </span>
            {/* Social platforms */}
            {/* <span className="flex gap-2 items-center">
              <span className="flex justify-center items-center bg-[#0075fa] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-facebook text-white text-sm"></i>
              </span>
              <span className="flex justify-center items-center bg-[#fe2c55] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-reddit text-white text-sm"></i>
              </span>
              <span className="flex justify-center items-center bg-[#25d366] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-line text-white text-sm"></i>
              </span>
              <span className="flex justify-center items-center bg-[#1da1f2] w-5 h-5 rounded-full p-3 cursor-pointer">
                <i className="fab fa-twitter text-white text-sm"></i>
              </span>
            </span> */}
          </div>
          {/* Comment & Reply section */}
          <CommentSection />

          {/* Comment input */}
          <div className="flex items-center justify-center flex-wrap">
            <div className="py-10 px-7 flex gap-2 max-w-full">
              {/* <input
                type="text"
                className="px-3 py-3 text-slate-600 bg-customedGrey bg-customedGrey 
                rounded text-sm border-0 shadow outline-none caret-customedPink w-full md:w-[350px]"
                placeholder="Add comment..."
              /> */}
              <button
                className="text-customedPink font-semibold text-md bg-customedGrey px-4 py-5 w-full md:w-[350px] flex items-start"
                onClick={() => onSignIn()}
              >
                Log in to comment
              </button>
              {/* <button className="border-none outline-none font-semibold text-customedPink px-2 py-2 text-sm">
                Post
              </button> */}
            </div>
          </div>
        </div>
      </>
    );
};

export default VideoInfo;