import { BASE_URL, GET_ALL_VIDEOS_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IVideo } from '@/interfaces/interfaces';

type IVideoResponse = IVideo[];
// get video by videoId
interface IOwnerVideo {
  _id: string;
  avatarUrl: string;
  fullname: string;
  nickname: string;
}
interface IVideoByIdInfo {
  _id: string;
  videoUrl: string;
  videoHashtag: string;
  videoTitle: string;
  like: [];
  comment: [];
  createdAt: string;
  updatedAt: string;
  ownerVideo: IOwnerVideo;
  __v: number;
}
// get video by userId
export interface IMyVideoInfo {
  _id: string;
  videoUrl: string;
  videoTitle: string;
  videoHashtag: string;
  ownerVideo: string;
  like: [];
  comment: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IOwnerInfo {
  _id: string;
  avatarUrl: string;
  nickname: string;
  fullname: string;
  username: string;
  role: string;
  myVideo: IMyVideoInfo[];
  videoliked: [];
  following: [];
  follow: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
//get all replies by commentId
interface ICommentReply {
  _id: string;
  content: string;
  like: [];
  reply: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface IRepliesResponse {
  success: boolean;
  commentReply: ICommentReply;
}
// post comment
export interface IPostComment {
  comment: string;
  userId: string | undefined;
  videoId: string | undefined;
}
interface IPostCommentResponse {
  success: boolean;
  video: {
    _id: string;
    videoUrl: string;
    videoTitle: string;
    videoHastag: string;
    ownerVideo: string;
    like: [];
    comment: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
interface IPostCommentResponseData {
  data: IPostCommentResponse;
}
// post replies
export interface IRepliesContent {
  userId: string | undefined;
  replyComment: string;
  commentId: string | undefined;
}
interface IPostRepliesResponse {
  success: boolean;
}
// type prepareHeaders
type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: "query" | "mutation";
    forced: boolean | undefined;
  }
) => Headers | void;
// put like video / comment
interface ILikeParam {
  likedVideoId: string;
  userLikeId: string;
}
interface ILikeResponse {
  _id: string;
  videoUrl: string;
  videoTitle: string;
  videoHastag: string;
  ownerVideo: string;
  like: [];
  comment: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
// put follow account
interface IFollowingParam {
  followedUser: string; // get from videoOwnerId
  userFollow: string; // get from useModal()
}
interface IFollowingAccountResponse {
  _id: string;
  avatarUrl: string;
  nickname: string;
  fullname: string;
  username: string;
  password: string;
  role: string;
  myVideo: [];
  videoliked: [];
  following: [];
  follow: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
// token
const token = localStorage.getItem("token");
// Create API
export const VideoDetailsApi = createApi({
  reducerPath: "videoDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['videoDetails'],
  endpoints: (builder) => ({
    getAllVideos: builder.query<IVideoResponse, void>({
      query: () => GET_ALL_VIDEOS_URL,
      providesTags: ['videoDetails'],
    }),
    getVideoByVideoId: builder.query<IVideoByIdInfo, string | undefined>({
      query: (_id) => `videos/${_id}`,
      providesTags: ['videoDetails'],
    }),
    getAllVideosByUserId: builder.query<IOwnerInfo, string | undefined>({
      query: (userId) => `accounts/searchuser/${userId}`,
      providesTags: ['videoDetails'],
    }),
    getAllRepliesByCommentId: builder.query<
      IRepliesResponse,
      string | undefined
    >({
      query: (currentCommentId) => `accounts/commentreply/${currentCommentId}`,
      providesTags: ['videoDetails'],
    }),
    postComment: builder.mutation<IPostCommentResponseData, IPostComment>({
      query: (commentContent) => ({
        url: 'accounts/comment',
        method: 'POST',
        body: commentContent,
      }),
      invalidatesTags: ['videoDetails'],
    }),
    postReply: builder.mutation<IPostRepliesResponse, IRepliesContent>({
      query: (replyContent) => ({
        url: 'accounts/reply',
        method: 'POST',
        body: replyContent,
      }),
      invalidatesTags: ['videoDetails'],
    }),
    // like video by videoId
    putLikeVideo: builder.mutation<ILikeResponse, ILikeParam>({
      query: (data) => ({
        url: 'accounts/like',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['videoDetails'],
    }),
    // like comment by commentId
    // putLike: builder.mutation<ILikeResponse, void>({
    //     query: (data) => ({
    //         url: "accounts/like",
    //         method: "PUT",
    //         body: data,
    //     }),
    //     invalidatesTags: ["videoDetails"],
    // }),
    // like reply by commentId
    // putLike: builder.mutation<ILikeResponse, void>({
    //     query: (data) => ({
    //         url: "accounts/like",
    //         method: "PUT",
    //         body: data,
    //     }),
    //     invalidatesTags: ["videoDetails"],
    // }),
    putFollowing: builder.mutation<IFollowingAccountResponse, IFollowingParam>({
      query: (data) => ({
        url: "accounts/follow",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["videoDetails"],
    }),
  }),
});

export const {
  useGetAllVideosQuery,
  useGetVideoByVideoIdQuery,
  useGetAllVideosByUserIdQuery,
  useGetAllRepliesByCommentIdQuery,
  usePostCommentMutation,
  usePostReplyMutation,
  usePutLikeVideoMutation,
  usePutFollowingMutation,
} = VideoDetailsApi;
