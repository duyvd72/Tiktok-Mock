import { useParams } from 'react-router-dom';
import MainVideo from './MainVideo/MainVideo';
import VideoInfo from './VideoInfo/VideoInfo';
import {
  useGetAllVideosByUserIdQuery,
  useGetVideoByVideoIdQuery,
} from '@/api/VideoDetails/apiSlice';
import useDebounce from '@/hooks/useDebounce';

const VideoDetails = () => {
  const { videoId } = useParams();
  //Call API fetch video info by videoId
  const {
    data: videoById,
    refetch
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetVideoByVideoIdQuery(videoId);
  console.log("videoById", videoById);
  const createdAt = videoById?.createdAt;
  const currentVideoId = videoById?._id;
  // const currentVideoUrl = videoById?.videoUrl;
  const videoOwnerId = videoById?.ownerVideo._id;
  const commentNumberOnSingleVideo = videoById?.comment.length;
  const commentArrayOnSingleVideo = videoById?.comment;
  // console.log("commentArrayOnSingleVideo: ", commentArrayOnSingleVideo);
  // const likeNumberOnSingleVideo = videoById?.like.length;
  const likeIdByVideoArr = videoById?.like;
  const userFullname = videoById?.ownerVideo.fullname;
  const userNickName = videoById?.ownerVideo.nickname;
  const avatarUrl = videoById?.ownerVideo.avatarUrl;
  const videoHashTag = videoById?.videoHashtag;
  const videoTitle = videoById?.videoTitle;
  const numberOfShareVideo = Math.ceil(Math.random() * 10).toFixed(1);

  //Call API fetch user info by user id
  const { data: userById } = useGetAllVideosByUserIdQuery(videoOwnerId);
  // const numberOfFollows = userById?.follow.length;
  //Check if the user's already followed someone
  // const followingAccountsArr = userById?.following;
  // const userName = userById?.username;
  // myVideoListArr includes showing all comments for all videos
  const myVideoListArr = userById?.myVideo;

  const debouncedRefetch = useDebounce(refetch, 500);

  return (
    <div className="grid grid-cols-12 fixed inset-0 max-w-screen max-h-screen h-screen overflow-auto z-50 top-0 left-0">
      {/* Main Video */}
      <MainVideo
        myVideoListArr={myVideoListArr}
        currentVideoId={currentVideoId}
      />
      {/* Video Info */}
      <VideoInfo
        data={videoById}
        userNickName={userNickName}
        videoTitle={videoTitle}
        videoHashTag={videoHashTag}
        avatarUrl={avatarUrl}
        commentNumberOnSingleVideo={commentNumberOnSingleVideo}
        // likeNumberOnSingleVideo={likeNumberOnSingleVideo}
        numberOfShareVideo={numberOfShareVideo}
        myVideoListArr={myVideoListArr}
        currentVideoId={currentVideoId}
        commentArrayOnSingleVideo={commentArrayOnSingleVideo}
        likeIdByVideoArr={likeIdByVideoArr}
        videoOwnerId={videoOwnerId}
        userFullname={userFullname}
        createdAt={createdAt}
        refetch={() => debouncedRefetch()}
      />
    </div>
  );
};

export default VideoDetails;
