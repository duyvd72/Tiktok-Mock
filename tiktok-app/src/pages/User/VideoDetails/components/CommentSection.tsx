import { useState } from "react";
import logoIcon from "@/assets/images/logo-icon.png";
import { NavLink } from 'react-router-dom';


const RepliesList = () => {
    const replies = ['Reply 1', 'Reply 2', 'Reply 3', 'Reply 4', 'Reply 5'];
    const repliesLimit = replies.slice(0, 3);
    
  
    return (
      <div className="bg-customedGrey p-2 mt-2 text-black flex flex-col justify-center items-center w-full">
        {replies.map((reply, index) => (
          <div key={index}>{reply}</div>
        ))}
      </div>
    );
  };

const CommentSection = () => {
    const [showReplies, setShowReplies] = useState<boolean>(false);
    const toggleRepliesBlock = () => {
        setShowReplies(!showReplies);
      };
      

    return (
      <>
        {/* Comment & Reply section */}
        <div className="min-h-[400px] max-h-11/12 h-full max-w-full bg-customedGrey text-white overflow-y-scroll px-4 pt-2 border-t border-b border-gray-300">
          <div className="h-[400px]">
            {/* Comment 1 */}
            <div className="flex flex-col mb-2 flex-wrap">
              {/* Header */}
              <div className="flex flex-col items-start">
                {/* Left header */}
                <div className="flex gap-2 items-center justify-between w-full">
                  {/* Avatar */}
                  <NavLink
                    to="/userId"
                    className="bg-black w-10 h-10 rounded-full line-height flex items-center justify-center mt-[-10px]"
                  >
                    <img src={logoIcon} alt="avatar" className="p-2" />
                  </NavLink>
                  {/* account & username */}
                  <div className="flex-grow">
                    <NavLink to="/" className="">
                      <p className="font-semibold text-md text-black hover:underline mt-3">
                        monmen944
                      </p>
                    </NavLink>
                    <span className="text-sm text-black mr-5">19/12</span>
                    <div>
                      <span className="text-sm text-[#a19d9d] mr-5">
                        3h ago
                      </span>
                      <button className="text-sm text-[#a19d9d]">Reply</button>
                    </div>
                  </div>
                  {/* Right header */}
                  <div className="flex flex-col items-center">
                    <button>
                      <i className="far fa-heart text-black"></i>
                    </button>
                    <p className="text-xs text-black">3586</p>
                  </div>
                </div>
                {/* View more replies */}
                <div className="flex items-center pl-12 mt-2">
                  <button
                    className="text-sm text-black hover:underline"
                    onClick={toggleRepliesBlock}
                  >
                    View more replies
                    <span className="text-sm text-black">(5)</span>
                    <i className="fas fa-chevron-down self-center ml-2"></i>
                  </button>
                </div>
                {/* Replies List */}
                {showReplies && <RepliesList />}
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default CommentSection;