import { NavLink } from 'react-router-dom';
import logoIcon from '@/assets/images/logo-icon.png';
import useModal from '@/hooks/useModal';
import RepliesSection from '../components/RepliesSection/RepliesSection';
import {
  IMyVideoInfo,
  useGetAllRepliesByCommentIdQuery,
  usePostCommentMutation,
  usePostReplyMutation,
  usePutFollowingMutation,
  usePutLikeVideoMutation,
} from '@/api/VideoDetails/apiSlice';
import { useState, useRef } from 'react';
import { IPostComment, IRepliesContent } from '@/api/VideoDetails/apiSlice';
import ModalEditVideo from '../components/ModalEditVideo';
import useDebounce from '@/hooks/useDebounce';

interface IVideoInfoProps {
  userNickName: string | undefined;
  videoTitle: string | undefined;
  videoHashTag: string | undefined;
  avatarUrl: string | undefined;
  commentNumberOnSingleVideo: number | undefined;
  likeNumberOnSingleVideo: number | undefined;
  numberOfShareVideo: string | undefined;
  myVideoListArr: IMyVideoInfo[] | undefined;
  currentVideoId: string | undefined;
  commentArrayOnSingleVideo: [] | undefined;
  likeIdByVideoArr: [] | undefined;
  videoOwnerId: string | undefined;
}
export interface IActiveFunctionality {
  mode: string;
  nickname: string | undefined;
}

const VideoInfo = (props: IVideoInfoProps) => {
  const {
    userNickName,
    videoTitle,
    videoHashTag,
    avatarUrl,
    commentNumberOnSingleVideo,
    likeNumberOnSingleVideo,
    currentVideoId,
    commentArrayOnSingleVideo,
    videoOwnerId,


  } = props;
  const repliesSectionRef = useRef<HTMLDivElement | null>(null);
  const [commentContent, setCommentContent] = useState<string>('');
  const [likedVideo, setLikedVideo] = useState<string[]>([]);
  const [followingAccount, setFollowingAccount] = useState<string[]>([]);
  const [activeFunctionality, setActiveFunctionality] =
    useState<IActiveFunctionality>({
      mode: 'comment',
      nickname: '',
    });
  const [currentCommentId, setCurrentCommentId] = useState<string | undefined>(
    ''
  );
  const [titleVideo, setTitleVideo] = useState(videoTitle)
  const [hashTagVideo, setHashTagVideo] = useState(videoHashTag)
  const { setModalIsOpen, currentUser } = useModal();
  const [openModal, setOpenModal] = useState(false)
  const currentUserId = currentUser && currentUser._id;
  // console.log("Current user nickname: ", currentUser.nickname);
  // console.log("Current user ID: ", currentUserId);

  const { data: getAllReplies } =
    useGetAllRepliesByCommentIdQuery(currentCommentId);
  // console.log("getAllReplies: >>>", getAllReplies);
  const numberOfLikesOnSingleComment = getAllReplies?.commentReply.like.length;
  const replyContentArr = getAllReplies?.commentReply.reply;
  const numberOfLikeOnSingleReply = getAllReplies?.commentReply.like.length;

  const scrollToTop = () => {
    setTimeout(() => {
      if (repliesSectionRef.current) {
        repliesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  };

  const onSignIn = () => {
    setModalIsOpen(true);
  };

  const handleOnChangePostComment = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const content = e.target.value;
    const nickname = `@${activeFunctionality.nickname}`;
    setCommentContent(content);
    if (activeFunctionality.mode === "reply") {
      // Check if the content includes "@username"
      // const username = `${activeFunctionality.username}`;
      if (content.includes(nickname)) {
        const atIndex = content.lastIndexOf(nickname);

        // Check if the username is followed by a space or reached the beginning of the string
        if (content.charAt(atIndex - 1) === ' ' || atIndex === 0) {
          setCommentContent(content); // Set the comment content as it is
        } else {
          // Remove the "@username" part by replacing it with the remaining content
          setCommentContent(
            content.slice(0, atIndex) + content.slice(atIndex + nickname.length)
          );
        }
      } else {
        setCommentContent(content);
      }
    }
    else if (
      activeFunctionality.mode === "reply" && !content.includes(`@${nickname}`)
    ) {
      setActiveFunctionality({ mode: "comment", nickname: "" });
      setCommentContent('');
    }
    if (content === "") {
      setCommentContent("");
      setActiveFunctionality({ mode: "comment", nickname: "" });
    }
  };

  //Call API
  const [postComment] = usePostCommentMutation();
  const [postReply] = usePostReplyMutation();
  const [putLikeVideo] = usePutLikeVideoMutation();
  const [putFollowing] = usePutFollowingMutation();

  const handlePostClick = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Post button clicked!!");
    // debugger;
    try {
      if (activeFunctionality.mode === "comment") {
        const payload: IPostComment = {
          comment: commentContent,
          userId: currentUserId,
          videoId: currentVideoId,
        };
        // Post comment functionality
        // console.log("Post functionality!!");
        const response = await postComment(payload);
        commentArrayOnSingleVideo?.unshift(payload as never);
        console.log(response);
        // handle if post a comment successfully
        // if (isSuccess) {
        //   commentArrayOnSingleVideo?.unshift(payload);
        //   toast.success("Nice comment!!");
        // }
      } else if (activeFunctionality.mode === "reply") {
        // Post reply to single comment functionality
        // console.log("Reply functionality: ");
        const payload: IRepliesContent = {
          userId: currentUserId,
          replyComment: commentContent,
          commentId: currentCommentId,
        };
        const response = await postReply(payload);
        replyContentArr?.unshift(payload as never);
        console.log(response);
        // handle if post a reply to a commentId successfully
        // if (isSuccess) {
        //   // commentArrayOnSingleVideo?.unshift(payload);
        //   console.log("successfully replied!!");
        //   toast.success("Nice reply!!");
        // }
      }
    } catch (error) {
      setCommentContent("");
      setActiveFunctionality({ mode: "comment", nickname: "" });
      if (activeFunctionality.mode === "comment") {
        scrollToTop();
      }
      console.error(error);
    }
  };

  // currentUserId = userFollow
  const handleFollowingButton = async (currentVideoId: string) => {
    // console.log("videoOwnerId: ", videoOwnerId);
    setFollowingAccount((prevFollowing) => {
      if (prevFollowing.includes(currentVideoId)) {
        return prevFollowing.filter((id) => id !== currentVideoId);
      } else {
        return [...prevFollowing, currentVideoId];
      }
    });
    try {
      const payload = {
        followedUser: videoOwnerId,
        userFollow: currentUserId,
      };
      const response = await putFollowing(payload);
      console.log(response);
      // const userLikeVideoArr = response.data.like;
      // const isIncluded = userLikeVideoArr?.every((id: string) => likeIdByVideoArr?.includes(id))
      // if(isIncluded) {
      //   console.log("isIncluded");
      // };
      // console.log('Following this account successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeVideoClick = async (currentVideoId: string) => {
    // console.log(currentVideoId);
    setLikedVideo((prevLikedVideo) => {
      if (prevLikedVideo.includes(currentVideoId)) {
        return prevLikedVideo.filter((id) => id !== currentVideoId);
      } else {
        return [...prevLikedVideo, currentVideoId];
      }
    });
    try {
      const payload = {
        likedVideoId: currentVideoId,
        userLikeId: currentUserId,
      };
      const response = await putLikeVideo(payload);
      console.log(response);
      // const userLikeVideoArr = response.data.like;
      // const isIncluded = userLikeVideoArr?.every((id: string) => likeIdByVideoArr?.includes(id))
      // if(isIncluded) {
      //   console.log("isIncluded");
      // };
      // console.log('Like video successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const storedLikedVideo = localStorage.getItem('likedVideo');
  //   const storedFollowingAccount = localStorage.getItem('followingAccount');

  //   if (storedLikedVideo) {
  //     setLikedVideo(JSON.parse(storedLikedVideo));
  //   }

  //   if (storedFollowingAccount) {
  //     setFollowingAccount(JSON.parse(storedFollowingAccount));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('likedVideo', JSON.stringify(likedVideo));
  //   localStorage.setItem('followingAccount', JSON.stringify(followingAccount));
  // }, [likedVideo, followingAccount]);

  // Declare useDebounce hooks
  const useDebounceHandleLikeVideoClick = useDebounce(handleLikeVideoClick, 300);
  // const useDebounceHandlePostClick = useDebounce(handlePostClick, 300);

  return (
    <>
      {/* Video Info */}
      <div className="col-span-4 flex flex-col pt-5 bg-white">
        {/* Header */}
        <div className="flex justify-between px-4">
          {/* Left header*/}
          <div className="flex gap-2 items-center max-w-[80%]">
            {/* Avatar */}
            <NavLink
              to={`/${videoOwnerId}`}
              className="bg-black w-[40px] h-[38px] rounded-full flex items-center justify-center self-start min-w-[40px] min-h-[20px] mt-2"
            >
              <img src={avatarUrl || logoIcon} alt="avatar" className="p-2 min-w-[20px] min-h-[20px]" />
            </NavLink>
            {/* account & username */}
            <div className="leading-5 mr-2">
              <NavLink to={`/${videoOwnerId}`} className="">
                <p className="font-semibold text-lg text-black hover:underline ">
                  {userNickName}
                </p>
              </NavLink>
              <span className="text-sm text-black">{titleVideo}</span>
              <div className="text-sm text-black mt-1">4d ago</div>
            </div>
          </div>
          {/* Right header*/}
          {currentUserId && videoOwnerId ? (
            <button
              className={`border border-customedPink ${followingAccount.includes(videoOwnerId)
                ? "bg-customedPink text-white"
                : ""} hover:bg-[#fe2c550f] hover:ease-in-out transition duration-300 rounded-lg 
                  font-semibold text-customedPink px-4 flex-wrap sm:text-sm xs:text-xs min-w-[120px] min-h-[50px] w-[120px] h-[50px]`
              }
              onClick={() => handleFollowingButton(videoOwnerId)}
            >
              Follow
            </button>
          ) : (
            <button
              className="border border-customedPink hover:bg-[#fe2c550f] 
              hover:ease-in-out transition duration-300 rounded-lg bg-transparent 
              font-semibold text-customedPink px-4 min-w-[120px] min-h-[50px] w-[120px] h-[50px] flex-wrap sm:text-sm xs:text-xs"
              onClick={() => onSignIn()}
            >
              Follow
            </button>
          )}
        </div>
        {/* description */}
        <div className="flex justify-start items-center gap-1 pl-4 flex-wrap leading-none max-w-full mt-3">
          {/* <span className="text-sm text-black">Stay balling</span> */}
          <span>
            <NavLink to="/">
              <span className="text-black font-semibold hover:underline text-sm">
                {hashTagVideo}
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
            {currentUserId && currentVideoId ? (
              <button
                className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 cursor-pointer"
                onClick={() => useDebounceHandleLikeVideoClick(currentVideoId)}
              >
                <i
                  className={`fas fa-heart ${likedVideo.includes(currentVideoId)
                    ? 'text-customedPink'
                    : ''
                    }`}
                ></i>
              </button>
            ) : (
              <button
                className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 cursor-pointer"
                onClick={() => onSignIn()}
              >
                <i className="fas fa-heart"></i>
              </button>
            )}
            <span className="text-xs font-semibold">
              {likeNumberOnSingleVideo}
            </span>
            <span className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 disabled">
              <i className="fas fa-comment-dots"></i>
            </span>
            <span className="text-xs font-semibold">
              {commentNumberOnSingleVideo}
            </span>
            {videoOwnerId == currentUser._id &&
              < button
                onClick={() => setOpenModal(prev => !prev)}
                className='absolute right-5 p-2 rounded-md bg-slate-300 hover:bg-slate-200'
              >Sửa Video</button>
            }
            {/* <button
              className="flex justify-center items-center bg-slate-100 w-5 h-5 rounded-full p-4 cursor-pointer"
              onClick={() => onSignIn()}
            >
              <i className="fas fa-bookmark"></i>
            </button> */}
            {/* <span className="text-xs font-semibold">{numberOfShareVideo}k</span> */}
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
        <div className="min-h-[400px] max-h-11/12 h-full max-w-full bg-customedGrey text-white overflow-y-scroll px-4 pt-2 border-t border-b border-gray-300">
          <div className="h-[400px]">
            <RepliesSection
              activeFunctionality={activeFunctionality}
              setActiveFunctionality={setActiveFunctionality}
              currentCommentId={currentCommentId}
              setCurrentCommentId={setCurrentCommentId}
              numberOfLikesOnSingleComment={numberOfLikesOnSingleComment}
              replyContentArr={replyContentArr}
              numberOfLikeOnSingleReply={numberOfLikeOnSingleReply}
              repliesSectionRef={repliesSectionRef}

            />
          </div>
        </div>
        {/* Comment input */}
        <div className="flex items-center justify-center flex-wrap">
          <div className="py-10 px-7 flex gap-2 max-w-full">
            {currentUserId ? (
              <>
                <form
                  onSubmit={handlePostClick}
                  className="w-full md:w-[350px]"
                >
                  <input
                    type="text"
                    className="px-3 py-3 text-slate-600 bg-customedGrey
                  rounded text-sm border-0 shadow outline-none caret-customedPink w-full md:w-[350px]"
                    placeholder={
                      activeFunctionality.mode === 'reply'
                        ? `Reply to ${activeFunctionality.nickname}:`
                        : 'Add comment...'
                    }
                    value={commentContent}
                    onChange={handleOnChangePostComment}
                  />
                </form>
                {commentContent === '' ? (
                  <button
                    className="border-none outline-none font-extrabold text-slate-400 px-2 py-2 text-sm disabled cursor-default"
                    onClick={handlePostClick}
                  >
                    Post
                  </button>
                ) : (
                  <button
                    className="border-none outline-none font-semibold text-customedPink px-2 py-2 text-sm"
                    onClick={handlePostClick}
                  >
                    Post
                  </button>
                )}
              </>
            ) : (
              <button
                className="text-customedPink font-semibold text-md bg-customedGrey px-4 py-5 w-full md:w-[350px] flex items-start"
                onClick={() => onSignIn()}
              >
                Log in to comment
              </button>
            )}
          </div>
          {openModal ?
            <ModalEditVideo
              videoId={currentVideoId as string}
              titleVideo={titleVideo as string}
              hashtagVideo={hashTagVideo as string}
              setOpenModal={setOpenModal}
              setHashTagVideo={setHashTagVideo}
              setTitleVideo={setTitleVideo}
            />
            : ''}
        </div>
      </div >
    </>
  );
};

export default VideoInfo;
