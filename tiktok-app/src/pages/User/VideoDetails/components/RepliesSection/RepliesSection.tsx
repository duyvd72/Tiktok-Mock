import { useEffect, useRef, useState } from 'react';
import logoIcon from '@/assets/images/logo-icon.png';
import { NavLink, useParams } from 'react-router-dom';
import {
  useGetAllRepliesByCommentIdQuery,
  useGetAllVideosByUserIdQuery,
  useGetVideoByVideoIdQuery,
} from '@/api/VideoDetails/apiSlice';
import { IActiveFunctionality } from '../../VideoInfo/VideoInfo';
import useModal from '@/hooks/useModal';

interface IRepliesSectionProps {
  activeFunctionality: IActiveFunctionality;
  setActiveFunctionality: (value: IActiveFunctionality) => void;
  currentCommentId: string | undefined;
  setCurrentCommentId: (value: string | undefined) => void;
  numberOfLikesOnSingleComment: number | undefined;
  replyContentArr: [] | undefined;
  numberOfLikeOnSingleReply: number | undefined;
  repliesSectionRef: React.RefObject<HTMLDivElement> | null;
}
interface ICommentContentUser {
  _id: string;
  fullname: string;
  nickname: string;
  role: string;
  username: string;
  follow: [];
  following: [];
  myVideo: [];
  createdAt: string;
  updatedAt: string;
  videoliked: [];
  __v: number;
}
interface ICommentContent {
  _id: string;
  content: string;
  like: [];
  reply: [];
  updatedAt: string;
  createdAt: string;
  user: ICommentContentUser;
}
interface IUserReply {
  _id: string;
  createdAt: string;
  follow: [];
  following: [];
  myVideo: [];
  password: string;
  role: string;
  updatedAt: string;
  username: string;
  videoLiked: [];
  nickname: string;
  fullname: string;
  __v: number;
}
interface IReplyContent {
  _id: string;
  content: string;
  like: [];
  reply: [];
  createdAt: string;
  updatedAt: string;
  user: IUserReply;
  __v: number;
}

const RepliesSection = (props: IRepliesSectionProps) => {
  const {
    // activeFunctionality,
    setActiveFunctionality,
    // currentCommentId,
    setCurrentCommentId,
    // numberOfLikesOnSingleComment,
    replyContentArr,
    // numberOfLikeOnSingleReply,
    repliesSectionRef,
  } = props;
  const [showReplies, setShowReplies] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [likedReply, setLikeReply] = useState<string[]>([]);
  // const { currentUser } = useModal();
  // const currentUserId = currentUser._id;
  const { videoId } = useParams();
  // const {
  //   data: userInfo,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetAllVideosByUserIdQuery(currentUserId);
  // console.log("userInfo: >>>", userInfo);
  // const nicknameComment = userInfo?.nickname;
  // console.log("nicknameComment: ", nicknameComment)

  const { data: userComments } = useGetVideoByVideoIdQuery(videoId);
  // console.log("userComments: >>>", userComments);
  const userCommentsArr = userComments?.comment;
  // console.log("userCommentsArr: ", userCommentsArr);

  const handleViewMoreReplies = (currentCommentId: string) => {
    setShowReplies((prevState) => {
      if (prevState.includes(currentCommentId)) {
        return prevState.filter((id) => id !== currentCommentId);
      } else {
        return [...prevState, currentCommentId];
      }
    });
    setCurrentCommentId(currentCommentId);
  };

  const handleLikeComment = (currentCommentId: string) => {
    setLikedComments((prevLikedComments) => {
      if (prevLikedComments.includes(currentCommentId)) {
        return prevLikedComments.filter((id) => id !== currentCommentId);
      } else {
        return [...prevLikedComments, currentCommentId];
      }
    });
  };

  const handleLikeReply = (currentReplyId: string) => {
    setLikeReply((prevLikedComments) => {
      if (prevLikedComments.includes(currentReplyId)) {
        return prevLikedComments.filter((id) => id !== currentReplyId);
      } else {
        return [...prevLikedComments, currentReplyId];
      }
    });
  };

  const handleReplyToComment = (
    currentCommentId: string,
    nickname: string | undefined
  ) => {
    // console.log('reply button clicked!');
    // console.log('currentCommentId: ', currentCommentId);
    setActiveFunctionality({ mode: 'reply', nickname: nickname });
    setCurrentCommentId(currentCommentId);
  };

  return (
    <>
      {/* Comment 1 */}
      <div className="flex flex-col mb-2 flex-wrap" ref={repliesSectionRef}>
        {/* Header */}
        {userCommentsArr &&
          userCommentsArr.length > 0 &&
          userCommentsArr.map((comment: ICommentContent) => (
            <div className="flex flex-col items-start" key={comment._id}>
              {/* Left header */}
              <div className="flex gap-2 items-center max-w-full w-full pl-5">
                {/* Avatar */}
                <NavLink
                  to={`/${comment.user._id}`}
                  className="bg-black w-10 h-10 rounded-full line-height flex items-center 
                  justify-center mt-[-10px] min-w-[40px] min-h-[20px]"
                >
                  <img src={logoIcon} alt="avatar" className="p-2" />
                </NavLink>
                {/* account & username */}
                <div className="max-w-full min-w-[150px] w-[350px] max-h-[250px] self-start justify-start">
                  <NavLink to={`/${comment.user._id}`} className="">
                    <p className="font-semibold text-md text-black hover:underline mt-10">
                      {comment.user.nickname}
                    </p>
                  </NavLink>
                  <span className="text-sm text-black mr-5">19/12</span>
                  <div className="max-w-[350px] max-h-[200px] text-wrap">
                    <span className="text-sm text-black mr-5">
                      {comment.content}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-[#a19d9d] mr-5">3h ago</span>
                    <button
                      className="text-sm text-[#a19d9d]"
                      onClick={() =>
                        handleReplyToComment(comment._id, comment.user.nickname)
                      }
                    >
                      Reply
                    </button>
                  </div>
                </div>
                {/* Right header */}
                <div className="flex flex-col items-center">
                  <button onClick={() => handleLikeComment(comment._id)}>
                    <i
                      className={`fas fa-heart text-black ${
                        likedComments.includes(comment._id)
                          ? 'text-customedPink'
                          : ''
                      }`}
                    ></i>
                  </button>
                  {/* <span className="text-xs text-black">
                    {numberOfLikesOnSingleComment}
                  </span> */}
                </div>
              </div>
              {/* View more replies */}
              <div className="flex items-center ml-12 mt-2 ">
                {comment.reply.length && comment.reply.length > 0 ? (
                  <button
                    className="text-sm text-black hover:underline ml-5"
                    onClick={() => handleViewMoreReplies(comment._id)}
                  >
                    View more replies
                    <span className="text-xs text-black">
                      {''}
                      {`(${comment.reply.length})`}
                    </span>
                    <i className="fas fa-chevron-down self-center ml-2"></i>
                  </button>
                ) : null}
              </div>
              {/* Replies List */}
              {replyContentArr &&
                replyContentArr.length > 0 &&
                replyContentArr.map((reply: IReplyContent) => (
                  <div
                    className={`p-2 pt-0 text-black flex items-start 
                              justify-center ml-10 min-w-[80%] max-w-full ${
                                showReplies.includes(comment._id)
                                  ? 'opacity-100 transition-all duration-300 ease-in-out'
                                  : 'hidden'
                              }`}
                    key={reply._id}
                  >
                    <div className="flex gap-2 items-center w-full ml-20">
                      {/* Left header */}
                      <div className="self-start justify-start flex gap-2 items-center max-w-full">
                        {/* Avatar */}
                        <NavLink
                          to={`/${reply.user._id}`}
                          className="bg-black w-10 h-10 rounded-full line-height flex items-center justify-center mt-[-10px] min-w-[40px] min-h-[20px]"
                        >
                          <img src={logoIcon} alt="avatar" className="p-2" />
                        </NavLink>
                        {/* account & username */}
                        <div className="grow">
                          <NavLink to={`/${reply.user._id}`} className="">
                            <p className="font-semibold text-md text-black hover:underline mt-10">
                              {reply.user.nickname}
                            </p>
                          </NavLink>
                          <span className="text-sm text-black mr-5">19/12</span>
                          <div className="max-w-[350px]">
                            <span className="text-sm text-black mr-5">
                              {reply.content}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm text-[#a19d9d] mr-5">
                              3h ago
                            </span>
                            <button
                              className="text-sm text-[#a19d9d]"
                              onClick={() =>
                                handleReplyToComment(
                                  comment._id,
                                  reply.user.nickname
                                )
                              }
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                        {/* Right header */}
                        <div className="flex flex-col items-center ml-[130px]">
                          <button onClick={() => handleLikeReply(reply._id)}>
                            <i
                              className={`fas fa-heart text-black ${
                                likedReply.includes(reply._id)
                                  ? 'text-customedPink'
                                  : ''
                              }`}
                            ></i>
                          </button>
                          {/* <span className="text-xs text-black">
                            {numberOfLikeOnSingleReply}
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default RepliesSection;
